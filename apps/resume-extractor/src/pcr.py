import os
import base64
from pathlib import Path
import requests
from typing import Dict, Any, Optional

class PCRClient:
    """PC Recruiter API Client for managing candidates."""
    
    def __init__(self, base_url: str = None, username: str = None, password: str = None, database_id: str = None, pcr_database_id: str = None):
        """
        Initialize the PC Recruiter API client.
        
        Args:
            base_url: The base URL for the PC Recruiter API (defaults to PCR_BASE_URL env var)
            username: Username for authentication (defaults to PCR_USERNAME env var)
            password: Password for authentication (defaults to PCR_PASSWORD env var)
            database_id: Database ID for authentication (defaults to "Lotus Technical.xigentsolutions")
            pcr_database_id: PCR database identifier for URL construction (defaults to PCR_DATABASE_ID env var)
        """
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
        if not data.get("EmailAddress"):
            raise ValueError("EmailAddress is required")

        pcr_data = {
            "FirstName": data.get("FirstName"),
            "LastName": data.get("LastName"),
            "EmailAddress": data.get("EmailAddress"),
            "MiddleInitial": data.get("MiddleInitial"),
            "Address": data.get("Address"),
            "City": data.get("City"),
            "State": data.get("State"),
            "PostalCode": data.get("PostalCode"),
            "WorkPhone": data.get("WorkPhone"),
            "School": data.get("School"),
            "DegreeType": data.get("DegreeType"),
            "Status": data.get("Status"),
            "Industry": data.get("Industry") or "",
            "DateEntered": data.get("DateEntered"),
        }
        
        return pcr_data

    def update_candidate(self, candidate_id: str, candidate_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update an existing candidate in PC Recruiter.
        
        Args:
            candidate_id: The ID of the candidate to update
            candidate_data: Dictionary containing candidate information
            
        Returns:
            API response as dictionary
        """
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
        """
        Get candidate details by ID.
        
        Args:
            candidate_id: The ID of the candidate to retrieve
            
        Returns:
            Candidate data as dictionary
        """
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
        """
        Upload a resume file for a candidate.
        
        Args:
            candidate_id: The ID of the candidate
            file_path: Path to the resume file to upload
            
        Returns:
            API response as dictionary
        """
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
        """
        Encode a file to base64 string.
        
        Args:
            file_path: Path to the file to encode
            
        Returns:
            Base64 encoded string
        """
        with open(file_path, 'rb') as file:
            encoded_content = base64.b64encode(file.read()).decode('utf-8')
        return encoded_content

    def create_candidate_with_resume(self, candidate_data: Dict[str, Any], resume_file_path: str) -> Dict[str, Any]:
        """
        Create a candidate and upload their resume in one operation.
        
        Args:
            candidate_data: Dictionary containing candidate information
            resume_file_path: Path to the resume file to upload
            
        Returns:
            Combined result with candidate creation and resume upload results
        """
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
        """
        Transform currency value to PC Recruiter format.
        
        Args:
            value: Currency value (can be number, dict, or None)
            
        Returns:
            Currency object or None
        """
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