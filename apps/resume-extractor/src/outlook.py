import os
import logging
from typing import List, Optional, Dict, Any
from datetime import datetime
from msal import ConfidentialClientApplication
import requests
from dataclasses import dataclass

logger = logging.getLogger(__name__)

@dataclass
class EmailMessage:
    """Email message data structure."""
    id: str
    subject: str
    sender: str
    received_datetime: datetime
    has_attachments: bool
    attachments: List[Dict[str, Any]]
    body: str
    folder_id: str

class OutlookClient:
    """Outlook API client for email operations."""
    
    def __init__(self, client_id: str, client_secret: str, tenant_id: str, user_email: str = "exampleuser@gmail.com"):
        self.client_id = client_id
        self.client_secret = client_secret
        self.tenant_id = tenant_id
        self.user_email = user_email
        self.access_token = None
        self.graph_url = "https://graph.microsoft.com/v1.0"
        
        # Initialize MSAL client
        self.app = ConfidentialClientApplication(
            client_id=client_id,
            client_credential=client_secret,
            authority=f"https://login.microsoftonline.com/{tenant_id}"
        )
        
    def authenticate(self) -> bool:
        """Authenticate with Microsoft Graph API."""
        try:
            # Get token for application permissions
            scopes = ["https://graph.microsoft.com/.default"]
            result = self.app.acquire_token_for_client(scopes=scopes)
            
            if "access_token" in result:
                self.access_token = result["access_token"]
                logger.info("Successfully authenticated with Microsoft Graph")
                return True
            else:
                logger.error(f"Authentication failed: {result.get('error_description', 'Unknown error')}")
                return False
                
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            return False
    
    def _make_request(self, endpoint: str, method: str = "GET", data: Dict = None) -> Optional[Dict]:
        """Make authenticated request to Microsoft Graph API."""
        if not self.access_token:
            logger.error("No access token available. Please authenticate first.")
            return None
            
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
        
        url = f"{self.graph_url}{endpoint}"
        
        try:
            if method == "GET":
                response = requests.get(url, headers=headers)
            elif method == "POST":
                response = requests.post(url, headers=headers, json=data)
            elif method == "PATCH":
                response = requests.patch(url, headers=headers, json=data)
            else:
                logger.error(f"Unsupported HTTP method: {method}")
                return None
                
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"API request failed: {str(e)}")
            return None
    
    def get_folders(self) -> List[Dict[str, Any]]:
        """Get all mail folders for the user."""
        endpoint = f"/users/{self.user_email}/mailFolders"
        response = self._make_request(endpoint)
        
        if response and "value" in response:
            return response["value"]
        return []
    
    def get_folder_by_name(self, folder_name: str) -> Optional[Dict[str, Any]]:
        """Get folder by display name."""
        folders = self.get_folders()
        for folder in folders:
            if folder.get("displayName", "").lower() == folder_name.lower():
                return folder
        return None
    
    def get_sent_emails(self, top: int = 50) -> List[EmailMessage]:
        """Get emails from the Sent folder."""
        return self.get_sent_emails_with_filters(top=top, skip_bot_tagged=False)
        
    def get_sent_emails_with_filters(self, top: int = 50, start_date: Optional[datetime] = None, 
                                   skip_bot_tagged: bool = True) -> List[EmailMessage]:
        """Get emails from the Sent folder with filtering options."""
        
        # Build endpoint with parameters - order by oldest first for sequential processing
        params = [f"$top={top}", "$expand=attachments", "$orderby=receivedDateTime asc"]
        
        # Add filters
        filters = []
        if start_date:
            start_iso = start_date.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
            filters.append(f"receivedDateTime ge {start_iso}")
        
        if filters:
            filter_param = " and ".join(filters)
            params.append(f"$filter={filter_param}")
        
        endpoint = f"/users/{self.user_email}/mailFolders/SentItems/messages?" + "&".join(params)
        
        logger.info(f"Getting sent emails: {endpoint}")
        response = self._make_request(endpoint)
        
        emails = []
        if response and "value" in response:
            for msg in response["value"]:
                # Check bot tag manually if skip_bot_tagged is True
                if skip_bot_tagged:
                    categories = msg.get("categories", []) or []
                    if "Bot" in categories:
                        logger.info(f"Skipping email '{msg.get('subject', '')}' - already has Bot tag")
                        continue
                
                email = EmailMessage(
                    id=msg["id"],
                    subject=msg.get("subject", ""),
                    sender=msg.get("from", {}).get("emailAddress", {}).get("address", ""),
                    received_datetime=datetime.fromisoformat(msg["receivedDateTime"].replace("Z", "+00:00")),
                    has_attachments=msg.get("hasAttachments", False),
                    attachments=msg.get("attachments", []),
                    body=msg.get("body", {}).get("content", ""),
                    folder_id=msg.get("parentFolderId", "")
                )
                emails.append(email)
            
            logger.info(f"Successfully retrieved {len(emails)} emails from SentItems")
        else:
            logger.info("No emails found in SentItems folder")
                
        return emails

    def get_email_attachments(self, email_id: str) -> List[Dict[str, Any]]:
        """Get attachments for a specific email."""
        endpoint = f"/users/{self.user_email}/messages/{email_id}/attachments"
        response = self._make_request(endpoint)
        
        if response and "value" in response:
            return response["value"]
        return []
    
    def download_attachment(self, email_id: str, attachment_id: str) -> Optional[bytes]:
        """Download attachment content."""
        endpoint = f"/users/{self.user_email}/messages/{email_id}/attachments/{attachment_id}"
        response = self._make_request(endpoint)
        
        if response and "contentBytes" in response:
            import base64
            return base64.b64decode(response["contentBytes"])
        return None
    
    def download_attachment_to_file(self, email_id: str, attachment_id: str, filename: str) -> Optional[str]:
        """Download attachment and save to data folder."""
        content = self.download_attachment(email_id, attachment_id)
        if not content:
            logger.error(f"Failed to download attachment {attachment_id}")
            return None
        
        # Create data folder if it doesn't exist
        data_folder = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
        os.makedirs(data_folder, exist_ok=True)
        
        # Generate unique filename to avoid conflicts
        base_name, ext = os.path.splitext(filename)
        counter = 1
        file_path = os.path.join(data_folder, filename)
        
        while os.path.exists(file_path):
            new_filename = f"{base_name}_{counter}{ext}"
            file_path = os.path.join(data_folder, new_filename)
            counter += 1
        
        try:
            with open(file_path, 'wb') as f:
                f.write(content)
            
            logger.info(f"Downloaded attachment to: {file_path}")
            return file_path
            
        except Exception as e:
            logger.error(f"Failed to save attachment to {file_path}: {str(e)}")
            return None
    
    def move_email_to_folder(self, email_id: str, destination_folder_name: str) -> bool:
        """Move email to a specific folder."""
        # Find the destination folder
        folder = self.get_folder_by_name(destination_folder_name)
        if not folder:
            # Create folder if it doesn't exist
            folder = self.create_folder(destination_folder_name)
            if not folder:
                logger.error(f"Could not create or find folder: {destination_folder_name}")
                return False
        
        folder_id = folder["id"]
        
        # Move the email
        endpoint = f"/users/{self.user_email}/messages/{email_id}/move"
        data = {"destinationId": folder_id}
        
        response = self._make_request(endpoint, method="POST", data=data)
        return response is not None
    
    def create_folder(self, folder_name: str, parent_folder: str = "Inbox") -> Optional[Dict[str, Any]]:
        """Create a new mail folder."""
        # Get parent folder ID
        parent = self.get_folder_by_name(parent_folder)
        if not parent:
            logger.error(f"Parent folder not found: {parent_folder}")
            return None
        
        endpoint = f"/users/{self.user_email}/mailFolders/{parent['id']}/childFolders"
        data = {
            "displayName": folder_name
        }
        
        response = self._make_request(endpoint, method="POST", data=data)
        return response
    
    def add_tag(self, email_id: str, tag: str) -> bool:
        """Add category tag to an email."""
        endpoint = f"/users/{self.user_email}/messages/{email_id}"
        data = {
            "categories": [tag]
        }
        
        response = self._make_request(endpoint, method="PATCH", data=data)
        if response:
            logger.info(f"Added '{tag}' tag to email {email_id}")
            return True
        else:
            logger.error(f"Failed to add '{tag}' tag to email {email_id}")
            return False
    
    def email_has_bot_tag(self, email_id: str) -> bool:
        """Check if email has Bot category tag."""
        endpoint = f"/users/{self.user_email}/messages/{email_id}?$select=categories"
        response = self._make_request(endpoint)
        
        if response and "categories" in response:
            categories = response["categories"] or []
            return "Bot" in categories
        return False
    
    def has_resume_attachments(self, email: EmailMessage) -> bool:
        """Check if email has resume attachments (PDF, DOCX files)."""
        if not email.has_attachments:
            return False
        
        resume_extensions = [".pdf", ".docx", ".doc"]
        
        for attachment in email.attachments:
            filename = attachment.get("name", "").lower()
            if any(filename.endswith(ext) for ext in resume_extensions):
                return True
        
        return False

def create_outlook_client() -> OutlookClient:
    """Create Outlook client from environment variables."""
    client_id = os.getenv("OUTLOOK_CLIENT_ID")
    client_secret = os.getenv("OUTLOOK_CLIENT_SECRET")
    tenant_id = os.getenv("OUTLOOK_TENANT_ID")
    user_email = os.getenv("OUTLOOK_RECUITER_USER", "exampleuser@gmail.com")
    
    if not all([client_id, client_secret, tenant_id]):
        raise ValueError("Missing required Outlook environment variables")
    
    return OutlookClient(client_id, client_secret, tenant_id, user_email)
