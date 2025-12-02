"""Email processing and folder management for resume extraction."""
import logging
from typing import List, Optional, Tuple, Dict, Any
from datetime import datetime

from .outlook import OutlookClient, EmailMessage, create_outlook_client

logger = logging.getLogger(__name__)


class EmailManager:
    """Handles all email-specific operations for resume processing."""
    
    def __init__(self, outlook_client: Optional[OutlookClient] = None):
        self.outlook_client = outlook_client or create_outlook_client()
    
    def authenticate(self) -> bool:
        """Authenticate with Outlook API."""
        return self.outlook_client.authenticate()
    
    def get_inbox_emails(self, max_emails: int = 10, start_date: Optional[datetime] = None) -> List[EmailMessage]:
        """Get emails from inbox, filtered by date and sorted oldest first."""
        return self.outlook_client.get_inbox_emails(top=max_emails, start_date=start_date)
    
    def has_resume_attachments(self, email: EmailMessage) -> bool:
        """Check if email has resume attachments."""
        return self.outlook_client.has_resume_attachments(email)
    
    def extract_resume_attachments_to_data_folder(self, email: EmailMessage) -> List[Tuple[str, str, Dict[str, Any]]]:
        """Extract resume attachments and save to data folder for inspection.
        
        Returns:
            List of tuples: (file_path, original_filename, attachment_info)
        """
        downloaded_files = []
        resume_extensions = [".pdf", ".docx", ".doc"]
        
        try:
            for attachment in email.attachments:
                filename = attachment.get("name", "")
                
                # Check if attachment is a resume
                if not any(filename.lower().endswith(ext) for ext in resume_extensions):
                    logger.debug(f"Skipping non-resume attachment: {filename}")
                    continue
                
                logger.info(f"Downloading resume attachment: {filename}")
                
                # Download attachment to data folder
                file_path = self.outlook_client.download_attachment_to_file(
                    email.id, attachment["id"], filename
                )
                
                if file_path:
                    downloaded_files.append((file_path, filename, attachment))
                    logger.info(f"Downloaded attachment '{filename}' to: {file_path}")
                else:
                    logger.error(f"Failed to download attachment: {filename}")
                    
        except Exception as e:
            logger.error(f"Error downloading resume attachments from email {email.id}: {str(e)}")
            raise
        
        return downloaded_files
    
    def mark_email_as_processed(self, email: EmailMessage) -> bool:
        """Add Bot tag to email to mark it as processed."""
        try:
            return self.outlook_client.add_tag(email.id, "Bot")
        except Exception as e:
            logger.error(f"Error marking email as processed {email.id}: {str(e)}")
            return False
    
    def move_email_to_folder(self, email: EmailMessage, folder_name: str) -> bool:
        """Move email to specified folder."""
        try:
            result = self.outlook_client.move_email_to_folder(email.id, folder_name)
            if result:
                logger.info(f"Moved email '{email.subject}' to {folder_name} folder")
            else:
                logger.error(f"Failed to move email '{email.subject}' to {folder_name} folder")
            return result
        except Exception as e:
            logger.error(f"Error moving email to {folder_name} folder: {str(e)}")
            return False
    



class EmailProcessor:
    """Main email processor for resume extraction workflow."""
    
    def __init__(self, outlook_client: Optional[OutlookClient] = None):
        self.outlook_client = outlook_client or create_outlook_client()
        self.email_manager = EmailManager(self.outlook_client)
        self.folders = {
            "other": "Other",
            "pcr_entered": "PCR-Entered Resumes"
        }
    
    def authenticate(self) -> bool:
        return self.outlook_client.authenticate()
    
    def categorize_email(self, email: EmailMessage) -> str:
        has_resume = self.outlook_client.has_resume_attachments(email)
        
        if has_resume:
            logger.info(f"Email '{email.subject}' has resume attachments")
            return "resume"
        else:
            logger.info(f"Email '{email.subject}' has no resume attachments")
            return "other"
    
    def move_email_to_other(self, email: EmailMessage) -> bool:
        try:
            result = self.outlook_client.move_email_to_folder(
                email.id, 
                self.folders["other"]
            )
            if result:
                logger.info(f"Moved email '{email.subject}' to Other folder")
            else:
                logger.error(f"Failed to move email '{email.subject}' to Other folder")
            return result
        except Exception as e:
            logger.error(f"Error moving email to Other folder: {str(e)}")
            return False
    
    def move_email_to_pcr_entered(self, email: EmailMessage) -> bool:
        """Move email to 'PCR-Entered Resumes' folder and add Bot tag."""
        try:
            # Move to PCR-Entered Resumes folder
            result = self.outlook_client.move_email_to_folder(
                email.id, 
                self.folders["pcr_entered"]
            )
            if result:
                logger.info(f"Moved email '{email.subject}' to PCR-Entered Resumes folder with Bot tag")
            else:
                logger.error(f"Failed to move email '{email.subject}' to PCR-Entered Resumes folder")
            return result
        except Exception as e:
            logger.error(f"Error moving email to PCR-Entered Resumes folder: {str(e)}")
            return False
    
    def get_resume_attachments(self, email: EmailMessage) -> List[Tuple[str, str]]:
        """Get resume attachments by downloading them to data folder.
        
        Returns:
            List of tuples: (filename, file_path)
        """
        resume_attachments = []
        resume_extensions = [".pdf", ".docx", ".doc"]
        
        try:
            for attachment in email.attachments:
                filename = attachment.get("name", "")
                if any(filename.lower().endswith(ext) for ext in resume_extensions):
                    file_path = self.outlook_client.download_attachment_to_file(
                        email.id, 
                        attachment["id"], 
                        filename
                    )
                    if file_path:
                        resume_attachments.append((filename, file_path))
                        logger.info(f"Downloaded resume attachment '{filename}' to: {file_path}")
                    else:
                        logger.error(f"Failed to download attachment: {filename}")
            
        except Exception as e:
            logger.error(f"Error downloading resume attachments: {str(e)}")
        
        return resume_attachments
    
    def tag_email_as_processed(self, email: EmailMessage) -> bool:
        """Add Bot tag to email to mark it as processed."""
        return self.email_manager.mark_email_as_processed(email)
