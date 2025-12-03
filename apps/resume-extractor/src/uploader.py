"""
PCR Uploader module.

Handles all PC Recruiter upload operations, including candidate creation
and resume file uploads.
"""

import logging
import os
from typing import Dict, Any, Optional

from .pcr import PCRClient
from .resume import ResumeExtractor, ResumeExtractionError

logger = logging.getLogger(__name__)


class PCRUploadError(Exception):
    """Exception raised when PCR upload operations fail."""
    pass


class PCRUploader:
    """Handles uploading candidate data and resume files to PC Recruiter."""
    
    def __init__(self):
        """Initialize the PCR uploader."""
        self.client = None
        self._authenticated = False
    
    def authenticate(self) -> bool:
        """Authenticate with PC Recruiter API."""
        try:
            if not self.client:
                self.client = PCRClient()
            
            logger.info("Authenticating with PC Recruiter API...")
            self.client.authenticate()
            self._authenticated = True
            logger.info("Authentication successful!")
            return True
            
        except Exception as e:
            logger.error(f"PCR authentication failed: {str(e)}")
            self._authenticated = False
            return False
    
    def upload_candidate(self, candidate_data: Dict[str, Any]) -> Dict[str, Any]:
        """Upload candidate data only to PC Recruiter."""
        if not self._authenticated and not self.authenticate():
            raise PCRUploadError("Failed to authenticate with PC Recruiter")
        
        try:
            logger.info("Creating candidate in PC Recruiter...")
            logger.info("Candidate: %s %s", 
                       candidate_data.get('FirstName', 'Unknown'), 
                       candidate_data.get('LastName', 'Unknown'))
            
            result = self.client.create_candidate(candidate_data)
            
            logger.info("Candidate created successfully!")
            logger.info("Candidate ID: %s", result.get('CandidateId', 'Not available'))
            return result
            
        except Exception as e:
            logger.error(f"Failed to upload candidate: {str(e)}")
            raise PCRUploadError(f"Candidate upload failed: {str(e)}") from e
    
    def upload_candidate_with_resume(self, candidate_data: Dict[str, Any], file_path: str) -> Dict[str, Any]:
        """Upload candidate data and resume file to PC Recruiter."""
        if not self._authenticated and not self.authenticate():
            raise PCRUploadError("Failed to authenticate with PC Recruiter")
        
        if not os.path.exists(file_path):
            raise PCRUploadError(f"Resume file not found: {file_path}")
        
        try:
            logger.info("Creating candidate and uploading resume to PC Recruiter...")
            logger.info("Candidate: %s %s", 
                       candidate_data.get('FirstName', 'Unknown'), 
                       candidate_data.get('LastName', 'Unknown'))
            logger.info("Resume file: %s", file_path)
            
            result = self.client.create_candidate_with_resume(candidate_data, file_path)
            
            logger.info("Candidate and resume uploaded successfully!")
            logger.info("Candidate ID: %s", result.get('CandidateId', 'Not available'))
            return result
            
        except Exception as e:
            logger.error(f"Failed to upload candidate with resume: {str(e)}")
            raise PCRUploadError(f"Candidate and resume upload failed: {str(e)}") from e
    
    def upload_candidate_from_email_context(self, candidate_data: Dict[str, Any], 
                                          upload_resume: bool = True) -> Dict[str, Any]:
        """Upload candidate data using email context information."""
        # Get file path from email context if available for resume upload
        file_path = None
        if upload_resume and '_email_context' in candidate_data:
            file_path = candidate_data['_email_context'].get('downloaded_file_path')
        
        if upload_resume and file_path and os.path.exists(file_path):
            # Upload candidate and resume together
            return self.upload_candidate_with_resume(candidate_data, file_path)
        else:
            # Upload candidate only
            if upload_resume:
                logger.warning("Resume upload requested but no valid file path found in email context")
            return self.upload_candidate(candidate_data)


class ResumeUploader:
    """Handles the complete workflow of extracting resume data and uploading to PCR."""
    
    def __init__(self, extractor_type: str = "auto", openai_api_key: Optional[str] = None):
        """Initialize the resume uploader."""
        self.resume_extractor = ResumeExtractor(extractor_type=extractor_type, openai_api_key=openai_api_key)
        self.pcr_uploader = PCRUploader()
    
    def extract_and_upload(self, file_path: str, upload_resume: bool = True) -> Dict[str, Any]:
        """Extract candidate info from resume file and upload to PCR."""
        try:
            # Extract candidate data from resume
            logger.info("Extracting candidate data from: %s", file_path)
            candidate_data = self.resume_extractor.extract_candidate_from_file(file_path)
            
            # Upload to PCR
            if upload_resume:
                pcr_result = self.pcr_uploader.upload_candidate_with_resume(candidate_data, file_path)
            else:
                pcr_result = self.pcr_uploader.upload_candidate(candidate_data)
            
            # Combine results
            result = {
                'extraction_successful': True,
                'upload_successful': True,
                'candidate_data': candidate_data,
                'pcr_result': pcr_result,
                'candidate_id': pcr_result.get('CandidateId')
            }
            
            return result
            
        except ResumeExtractionError as e:
            logger.error(f"Resume extraction failed: {str(e)}")
            return {
                'extraction_successful': False,
                'upload_successful': False,
                'error': f"Extraction failed: {str(e)}"
            }
        except PCRUploadError as e:
            logger.error(f"PCR upload failed: {str(e)}")
            return {
                'extraction_successful': True,
                'upload_successful': False,
                'candidate_data': candidate_data if 'candidate_data' in locals() else None,
                'error': f"Upload failed: {str(e)}"
            }
        except Exception as e:
            logger.error(f"Unexpected error in extract and upload: {str(e)}")
            return {
                'extraction_successful': False,
                'upload_successful': False,
                'error': f"Unexpected error: {str(e)}"
            }