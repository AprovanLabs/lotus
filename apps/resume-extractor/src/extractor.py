"""
Resume extraction orchestrator.

This module provides the main orchestrator class that coordinates between
email operations and resume extraction, handling the sequential processing
workflow and result aggregation.
"""

import logging
from typing import List, Optional, Dict, Any
from datetime import datetime

from .email import EmailProcessor
from .outlook import EmailMessage
from .resume import ResumeExtractor, ResumeExtractionError
from .uploader import PCRUploader, PCRUploadError

logger = logging.getLogger(__name__)


class ResumeEmailExtractionError(Exception):
    """Exception raised when email resume extraction fails."""
    pass


class ResumeExtractionOrchestrator:
    """Orchestrates the email-resume extraction workflow by coordinating email operations and resume extraction."""
    
    def __init__(self, openai_api_key: Optional[str] = None, extractor_type: str = "auto"):
        """Initialize the extraction orchestrator."""
        self.email_processor = EmailProcessor()
        self.outlook_client = self.email_processor.outlook_client
        self.resume_extractor = ResumeExtractor(
            extractor_type=extractor_type, 
            openai_api_key=openai_api_key
        )
        self.pcr_uploader = PCRUploader()
        self.processed_count = 0
        
    def authenticate(self) -> bool:
        """Authenticate with email services."""
        return self.email_processor.authenticate()
    
    def _extract_candidates_from_email(self, email: EmailMessage) -> List[Dict[str, Any]]:
        """Extract candidate information from email resume attachments."""
        results = []
        
        try:
            # Download resume attachments to data folder
            downloaded_files = self.email_processor.email_manager.extract_resume_attachments_to_data_folder(email)
            
            if not downloaded_files:
                logger.info(f"No resume attachments found in email: {email.subject}")
                return results
            
            # Process each downloaded file
            for file_path, filename, attachment_info in downloaded_files:
                logger.info(f"Processing downloaded resume: {filename} at {file_path}")
                
                try:
                    # Extract candidate information from downloaded file
                    candidate_data = self.resume_extractor.extract_candidate_from_file(file_path)
                    
                    # Add email context to candidate data
                    candidate_data['_email_context'] = {
                        'email_id': email.id,
                        'email_subject': email.subject,
                        'email_sender': email.sender,
                        'email_received': email.received_datetime.isoformat(),
                        'attachment_name': filename,
                        'downloaded_file_path': file_path
                    }
                    
                    results.append(candidate_data)
                    logger.info(f"Successfully extracted candidate from {filename}")
                    
                except ResumeExtractionError as e:
                    logger.error(f"Failed to extract resume from {filename}: {str(e)}")
                    continue
                except Exception as e:
                    logger.error(f"Error processing {filename}: {str(e)}")
                    continue
                
        except Exception as e:
            logger.error(f"Error extracting candidates from email {email.id}: {str(e)}")
            raise ResumeEmailExtractionError(f"Candidate extraction failed: {str(e)}") from e
        
        return results
    
    def extract_from_single_email(self, email: EmailMessage, upload_to_pcr: bool = False) -> Dict[str, Any]:
        """Extract resume data from a single email following the complete workflow."""
        result = {
            'email_id': email.id,
            'email_subject': email.subject,
            'email_sender': email.sender,
            'email_received': email.received_datetime.isoformat(),
            'processed_at': datetime.now().isoformat(),
            'has_resume_attachments': False,
            'candidates_extracted': [],
            'moved_to_folder': None,
            'errors': [],
        }
        
        try:
            # Step 1: Check if email has resume attachments (Email Resolution Process)
            if not self.outlook_client.has_resume_attachments(email):
                logger.info(f"No resume attachments found in email: {email.subject}")
                # Move to 'Other' folder per specification
                if self.email_processor.move_email_to_other(email):
                    result['moved_to_folder'] = 'Other'
                    logger.info(f"Moved email '{email.subject}' to Other folder")
                else:
                    result['errors'].append("Failed to move email to Other folder")
                return result
            
            # Step 2: Process email with resume attachments (Resume Extraction Process)
            result['has_resume_attachments'] = True
            logger.info(f"Processing email with resume attachments: {email.subject}")
            
            # Extract candidate data from email attachments
            candidates = self._extract_candidates_from_email(email)
            result['candidates_extracted'] = candidates
            
            # Step 3: Upload to PC Recruiter if requested
            if upload_to_pcr and candidates:
                for candidate in candidates:
                    try:
                        # Upload candidate to PCR using email context
                        pcr_result = self.pcr_uploader.upload_candidate_from_email_context(candidate)
                        logger.info(f"Successfully uploaded candidate {candidate.get('FirstName', 'Unknown')} to PCR")
                        # Add PCR upload result to candidate data
                        candidate['_pcr_upload_result'] = pcr_result
                    except PCRUploadError as e:
                        error_msg = f"PCR upload failed: {str(e)}"
                        logger.error(error_msg)
                        result['errors'].append(error_msg)
                    except Exception as e:
                        error_msg = f"Unexpected PCR upload error: {str(e)}"
                        logger.error(error_msg)
                        result['errors'].append(error_msg)
            
            # Step 4: Move email to 'PCR-Entered Resumes' folder after processing
            if candidates and not result['errors']:
                if self.email_processor.move_email_to_pcr_entered(email):
                    result['moved_to_folder'] = 'PCR-Entered Resumes'
                    logger.info(f"Moved email '{email.subject}' to PCR-Entered Resumes folder")
                else:
                    result['errors'].append("Failed to move email to PCR-Entered Resumes folder")
            else:
                # Just tag with Bot if there were errors but don't move
                self.email_processor.tag_email_as_processed(email)
                result['moved_to_folder'] = 'Tagged only (errors occurred)'
            
            logger.info(f"Successfully processed email: {email.subject} - Found {len(candidates)} candidates")
            
        except Exception as e:
            error_msg = f"Error processing email {email.id}: {str(e)}"
            logger.error(error_msg)
            result['errors'].append(error_msg)
            # Tag email as processed even if errors occurred
            self.email_processor.tag_email_as_processed(email)
        
        finally:
            self.processed_count += 1
        
        return result
    
    def extract_from_emails_sequential(self, 
                                     max_emails: int = 10, 
                                     start_date: Optional[datetime] = None,
                                     upload_to_pcr: bool = False) -> Dict[str, Any]:
        """Extract resume data from emails sequentially, one at a time, from oldest to newest."""
        if not self.authenticate():
            raise ResumeEmailExtractionError("Failed to authenticate with email services")
        
        logger.info(f"Starting sequential email extraction - max_emails: {max_emails}, start_date: {start_date}")
        
        # Get sent emails using outlook client with filters
        emails = self.outlook_client.get_sent_emails_with_filters(
            top=max_emails, 
            start_date=start_date, 
            skip_bot_tagged=True
        )
        
        if not emails:
            logger.info("No emails found to process")
            return {
                'total_emails_found': 0,
                'emails_processed': 0,
                'candidates_found': 0,
                'errors': [],
                'results': []
            }
        
        logger.info(f"Found {len(emails)} emails to process sequentially")
        
        extraction_results = {
            'total_emails_found': len(emails),
            'emails_processed': 0,
            'candidates_found': 0,
            'errors': [],
            'results': []
        }
        
        # Process each email individually, one at a time
        for i, email in enumerate(emails, 1):
            logger.info(f"Processing email {i}/{len(emails)}: {email.subject}")
            logger.info(f"Email from: {email.sender}, received: {email.received_datetime}")
            
            try:
                result = self.extract_from_single_email(email, upload_to_pcr=upload_to_pcr)
                extraction_results['results'].append(result)
                extraction_results['emails_processed'] += 1
                extraction_results['candidates_found'] += len(result['candidates_extracted'])
                
                if result['errors']:
                    extraction_results['errors'].extend(result['errors'])
                
                # Log extraction summary for this email
                if result['has_resume_attachments']:
                    logger.info(f"Email {i} processed: Found {len(result['candidates_extracted'])} candidates")
                else:
                    logger.info(f"Email {i} processed: No resume attachments")
                
            except Exception as e:
                error_msg = f"Failed to process email {i} ({email.id}): {str(e)}"
                logger.error(error_msg)
                extraction_results['errors'].append(error_msg)
        
        logger.info(f"Sequential extraction complete - Processed: {extraction_results['emails_processed']}, "
                   f"Candidates found: {extraction_results['candidates_found']}")
        
        return extraction_results
    
    def run_complete_email_resolution_process(self, 
                                            max_emails: int = 10,
                                            start_date: Optional[datetime] = None,
                                            upload_to_pcr: bool = False) -> Dict[str, Any]:
        """Run the complete Email Resolution Process as specified in resume-extraction.md.
        
        This implements both:
        1. Email Resolution Process (sort emails to Other folder or keep for processing)
        2. Resume Extraction Process (extract resumes and move to PCR-Entered folder)
        """
        if not self.authenticate():
            raise ResumeEmailExtractionError("Failed to authenticate with email services")
        
        logger.info(f"Starting complete email resolution process - max_emails: {max_emails}, start_date: {start_date}")
        
        # Get sent emails using outlook client with filters
        emails = self.outlook_client.get_sent_emails_with_filters(
            top=max_emails, 
            start_date=start_date, 
            skip_bot_tagged=True
        )
        
        if not emails:
            logger.info("No emails found to process")
            return {
                'total_emails_found': 0,
                'emails_processed': 0,
                'moved_to_other': 0,
                'moved_to_pcr_entered': 0,
                'candidates_found': 0,
                'errors': [],
                'results': []
            }
        
        logger.info(f"Found {len(emails)} emails to process")
        
        process_results = {
            'total_emails_found': len(emails),
            'emails_processed': 0,
            'moved_to_other': 0,
            'moved_to_pcr_entered': 0,
            'candidates_found': 0,
            'errors': [],
            'results': []
        }
        
        # Process each email according to the specification
        for i, email in enumerate(emails, 1):
            logger.info(f"Processing email {i}/{len(emails)}: {email.subject}")
            logger.info(f"Email from: {email.sender}, received: {email.received_datetime}")
            
            try:
                result = self.extract_from_single_email(email, upload_to_pcr=upload_to_pcr)
                process_results['results'].append(result)
                process_results['emails_processed'] += 1
                
                # Track folder movements
                if result['moved_to_folder'] == 'Other':
                    process_results['moved_to_other'] += 1
                elif result['moved_to_folder'] == 'PCR-Entered Resumes':
                    process_results['moved_to_pcr_entered'] += 1
                
                process_results['candidates_found'] += len(result['candidates_extracted'])
                
                if result['errors']:
                    process_results['errors'].extend(result['errors'])
                
                # Log processing summary for this email
                if result['has_resume_attachments']:
                    logger.info(f"Email {i} processed: Found {len(result['candidates_extracted'])} candidates, moved to {result['moved_to_folder']}")
                else:
                    logger.info(f"Email {i} processed: No resume attachments, moved to {result['moved_to_folder']}")
                
            except Exception as e:
                error_msg = f"Failed to process email {i} ({email.id}): {str(e)}"
                logger.error(error_msg)
                process_results['errors'].append(error_msg)
        
        logger.info(f"Email resolution process complete - Processed: {process_results['emails_processed']}, "
                   f"Moved to Other: {process_results['moved_to_other']}, "
                   f"Moved to PCR-Entered: {process_results['moved_to_pcr_entered']}, "
                   f"Candidates found: {process_results['candidates_found']}")
        
        return process_results
    
    def get_extraction_stats(self) -> Dict[str, Any]:
        """Get extraction statistics."""
        return {
            'total_emails_processed': self.processed_count,
            'timestamp': datetime.now().isoformat()
        }


def extract_resumes_from_emails(max_emails: int = 10, 
                              start_date: Optional[datetime] = None,
                              upload_to_pcr: bool = False,
                              extractor_type: str = "auto") -> Dict[str, Any]:
    """Main function to run the complete email resolution and resume extraction process.
    
    This implements the full workflow from resume-extraction.md:
    1. Email Resolution Process - sort emails to appropriate folders
    2. Resume Extraction Process - extract resumes and upload to PCR if requested
    """
    try:
        orchestrator = ResumeExtractionOrchestrator(extractor_type=extractor_type)
        return orchestrator.run_complete_email_resolution_process(
            max_emails=max_emails,
            start_date=start_date,
            upload_to_pcr=upload_to_pcr
        )
    except Exception as e:
        logger.error(f"Email extraction failed: {str(e)}")
        return {
            'error': str(e),
            'total_emails_found': 0,
            'emails_processed': 0,
            'moved_to_other': 0,
            'moved_to_pcr_entered': 0,
            'candidates_found': 0,
            'results': []
        }
