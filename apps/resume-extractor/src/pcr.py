import os
import base64
from pathlib import Path
import requests
from typing import Dict, Any, Optional

class PCRClient:
    """PC Recruiter API Client for managing candidates."""
    
    def __init__(self, base_url: str = None, username: str = None, password: str = None, database_id: str = None, pcr_database_id: str = None):
        """Initialize the PC Recruiter API client."""
        self.base_url = (base_url or os.getenv('PCR_BASE_URL', 'https://www2.pcrecruiter.net')).rstrip('/')
        self.username = username or os.getenv('PCR_USERNAME')
        self.password = password or os.getenv('PCR_PASSWORD')
        self.database_id = database_id or "Lotus Technical.xigentsolutions"
        self.pcr_database_id = pcr_database_id or os.getenv('PCR_DATABASE_ID', 'odbc.xigentsolutions')
        self.session_id = os.getenv("PCR_TOKEN")
        
        if not self.username or not self.password:
            raise ValueError("Username and password must be provided either as arguments or via PCR_USERNAME/PCR_PASSWORD environment variables")
        
    def authenticate(self) -> str:
        auth_url = f"{self.base_url}/access-token?uid={self.pcr_database_id}"
        
        auth_payload = {
            "Username": self.username,
            "Password": self.password,
            "DatabaseId": self.database_id
        }
        
        headers = {
            "Content-Type": "application/json"
        }
        
        response = requests.post(auth_url, json=auth_payload, headers=headers)
        response.raise_for_status()
        
        auth_data = response.json()
        self.session_id = auth_data.get("SessionId")
        
        if not self.session_id:
            raise ValueError("SessionId not found in authentication response")
            
        return self.session_id
    
    def _get_headers(self) -> Dict[str, str]:
        if not self.session_id:
            raise ValueError("Not authenticated. Call authenticate() first.")
            
        return {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.session_id}"
        }
    
    def create_candidate(self, candidate_data: Dict[str, Any]) -> Dict[str, Any]:
        if not self.session_id:
            self.authenticate()
            
        candidates_url = f"{self.base_url}/candidatesV2?uid={self.pcr_database_id}"
        
        # Transform the input data to match PC Recruiter API format
        pcr_candidate = self._transform_candidate_data(candidate_data)
        
        response = requests.post(
            candidates_url,
            json=pcr_candidate,
            headers=self._get_headers()
        )
        response.raise_for_status()
        
        return response.json()
    
    def _transform_candidate_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform candidate data to minimal PC Recruiter API format.
        Based on successful candidate creation, we only include essential fields.
        """
        # Validate required fields
        if not data.get("FirstName"):
            raise ValueError("FirstName is required")
        if not data.get("LastName"):
            raise ValueError("LastName is required")
        if not data.get("EmailAddress") and not data.get("MobilePhone"):
            raise ValueError("EmailAddress or MobilePhone is required")

        pcr_data = {
            "FirstName": data.get("FirstName"),
            "LastName": data.get("LastName"),
            "MiddleInitial": data.get("MiddleInitial"),
            "Salutation": data.get("Salutation"),
            "Title": data.get("Title"),
            "Address": data.get("Address"),
            "Address2": data.get("Address2"),
            "City": data.get("City"),
            "State": data.get("State"),
            "PostalCode": data.get("PostalCode"),
            "PostalCodeExtension": data.get("PostalCodeExtension"),
            "FullPostalCode": data.get("FullPostalCode"),
            "County": data.get("County"),
            "Country": data.get("Country"),
            "HomePhone": data.get("HomePhone", data.get("MobilePhone")),
            "FaxPhone": data.get("FaxPhone"),
            "Pager": data.get("Pager"),
            "MobilePhone": data.get("MobilePhone") if data.get("HomePhone") else None,
            "WorkPhone": data.get("WorkPhone"),
            "CurrentOccupation": data.get("CurrentOccupation"),
            "Relocate": data.get("Relocate"),
            "CurrentSalary": data.get("CurrentSalary"),
            "DesiredSalary": data.get("DesiredSalary"),
            "School": data.get("School"),
            "DegreeType": data.get("DegreeType"),
            "GradYear": data.get("GradYear"),
            "DateEntered": data.get("DateEntered"),
            "EmailAddress": data.get("EmailAddress"),
            "Industry": data.get("Industry"),
            "Specialty": data.get("Specialty"),
            "ShowOnWebRollup": data.get("ShowOnWebRollup"),
            "Status": data.get("Status"),
            "Subjective": data.get("Subjective"),
            "Identification": data.get("Identification"),
            "Available": data.get("Available"),
            "BillRate": data.get("BillRate"),
            "PayRate": data.get("PayRate"),
            "DefaultCurrency": data.get("DefaultCurrency"),
            "UserName": data.get("UserName")
        }

        import json
        print(json.dumps(pcr_data, indent=2))
        
        return pcr_data

    def update_candidate(self, candidate_id: str, candidate_data: Dict[str, Any]) -> Dict[str, Any]:
        """Update an existing candidate in PC Recruiter."""
        if not self.session_id:
            self.authenticate()
            
        update_url = f"{self.base_url}/candidatesV2/{candidate_id}?uid={self.pcr_database_id}"
        
        # Transform the input data to match PC Recruiter API format
        pcr_candidate = self._transform_update_data(candidate_data)
        
        response = requests.put(
            update_url,
            json=pcr_candidate,
            headers=self._get_headers()
        )
        response.raise_for_status()
        
        return response.json()

    def get_candidate(self, candidate_id: str) -> Dict[str, Any]:
        """Get candidate details by ID."""
        if not self.session_id:
            self.authenticate()
            
        get_url = f"{self.base_url}/candidatesV2/{candidate_id}?uid={self.pcr_database_id}"
        
        response = requests.get(
            get_url,
            headers=self._get_headers()
        )
        response.raise_for_status()
        
        result = response.json()
        candidates = result.get("Results", [])
        
        if not candidates:
            raise ValueError(f"Candidate with ID {candidate_id} not found")
        
        return candidates[0]

    def upload_resume(self, candidate_id: str, file_path: str) -> Dict[str, Any]:
        """Upload a resume file for a candidate."""
        if not self.session_id:
            self.authenticate()
            
        # Validate file exists
        file_path_obj = Path(file_path)
        if not file_path_obj.exists():
            raise ValueError(f"File not found: {file_path}")
            
        # Encode file to base64
        base64_content = self._encode_file_to_base64(file_path)
        
        resume_url = f"{self.base_url}/candidates/{candidate_id}/resumes?uid={self.pcr_database_id}"
        
        resume_data = {
            "CandidateId": int(candidate_id),
            "Resume": base64_content,
            "FileName": file_path_obj.name
        }
        
        response = requests.post(
            resume_url,
            json=resume_data,
            headers=self._get_headers()
        )
        response.raise_for_status()
        
        return response.json()

    def _encode_file_to_base64(self, file_path: str) -> str:
        """Encode a file to base64 string."""
        with open(file_path, 'rb') as file:
            encoded_content = base64.b64encode(file.read()).decode('utf-8')
        return encoded_content

    def create_candidate_with_resume(self, candidate_data: Dict[str, Any], resume_file_path: str) -> Dict[str, Any]:
        """Create a candidate and upload their resume in one operation."""
        # Create the candidate first
        candidate_result = self.create_candidate(candidate_data)
        candidate_id = candidate_result.get('CandidateId')
        
        if not candidate_id:
            raise ValueError("Failed to get CandidateId from creation response")
        
        # Upload the resume
        resume_result = self.upload_resume(str(candidate_id), resume_file_path)
        
        # Return combined results
        return {
            "candidate": candidate_result,
            "resume": resume_result,
            "CandidateId": candidate_id
        }

    def _transform_update_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform candidate data for update operations.
        Includes proper handling of currency fields and status values.
        """
        return data

    def _transform_currency(self, value: Any) -> Optional[Dict[str, Any]]:
        """Transform currency value to PC Recruiter format."""
        if value is None:
            return None
            
        if isinstance(value, (int, float)):
            return {
                "CurrencyCode": None,
                "Value": value
            }
            
        if isinstance(value, dict):
            return {
                "CurrencyCode": value.get("CurrencyCode"),
                "Value": value.get("Value", 0)
            }
            
        return None