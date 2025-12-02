"""Resume Extractor CLI Tool"""

import sys
import json
import argparse
import logging
import os
from dotenv import load_dotenv
from datetime import datetime
from src.resume import extract_resume_to_json
from src.pcr import PCRClient
from src.extractor import extract_resumes_from_emails
from src.uploader import ResumeUploader

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

def extract_resume_command(args):
    """Extract resume to JSON format."""
    try:
        json_result = extract_resume_to_json(args.file_path, args.output, args.extractor_type)
        logger.info(json_result)
    except KeyboardInterrupt:
        logger.info("\nOperation cancelled by user")
    except (IOError, OSError, ValueError, RuntimeError) as e:
        logger.info(f"Error: {str(e)}")
        sys.exit(1)


def upload_pcr_command(args):
    """Upload candidate data to PC Recruiter from JSON file."""
    try:
        # Load candidate data from JSON file
        if not os.path.exists(args.json_file):
            logger.info(f"Error: JSON file not found: {args.json_file}")
            sys.exit(1)
            
        with open(args.json_file, 'r', encoding='utf-8') as f:
            candidate_data = json.load(f)
            
        logger.info(f"Loading candidate data from: {args.json_file}")
        logger.info(f"Candidate: {candidate_data.get('FirstName', 'Unknown')} {candidate_data.get('LastName', 'Unknown')}")
        
        client = PCRClient()
        
        logger.info("Authenticating with PC Recruiter API...")
        client.authenticate()
        logger.info("Authentication successful!")
        
        # Create candidate
        logger.info("Creating candidate in PC Recruiter...")
        result = client.create_candidate(candidate_data)
        
        logger.info("Candidate created successfully!")
        logger.info(f"Candidate ID: {result.get('CandidateId', 'Not available')}")
        logger.info(json.dumps(result, indent=2))
        
    except KeyboardInterrupt:
        logger.info("\nOperation cancelled by user")
    except FileNotFoundError:
        logger.info(f"Error: File not found: {args.json_file}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        logger.info(f"Error: Invalid JSON format in {args.json_file}: {str(e)}")
        sys.exit(1)
    except (IOError, OSError, ValueError, RuntimeError, ConnectionError) as e:
        logger.info(f"Error: {str(e)}")
        sys.exit(1)


def extract_and_upload_command(args):
    """Extract candidate info from resume and upload directly to PC Recruiter."""
    try:
        uploader = ResumeUploader(extractor_type=args.extractor_type)
        result = uploader.extract_and_upload(args.file_path, upload_resume=True)
        
        if result.get('extraction_successful') and result.get('upload_successful'):
            logger.info("Successfully extracted and uploaded candidate")
            logger.info(f"Candidate ID: {result.get('candidate_id', 'Not available')}")
            if args.verbose:
                logger.info(json.dumps(result, indent=2, default=str))
        else:
            logger.error(f"Operation failed: {result.get('error', 'Unknown error')}")
            sys.exit(1)
        
    except KeyboardInterrupt:
        logger.info("\nOperation cancelled by user")
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        sys.exit(1)


def process_email_command(args):
    """Process emails for resume extraction sequentially, starting from oldest."""
    try:
        # Parse start date if provided
        start_date = None
        if args.start_date:
            try:
                start_date = datetime.fromisoformat(args.start_date)
                logger.info(f"Processing emails from: {start_date}")
            except ValueError:
                logger.error(f"Invalid date format: {args.start_date}. Use YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS")
                sys.exit(1)
        
        logger.info(f"Processing up to {args.max_emails} emails (starting from oldest)...")
        logger.info(f"Upload to PCR: {args.upload_to_pcr}")
        logger.info(f"Extractor type: {args.extractor_type}")
        logger.info("-" * 50)
        
        # Run the email processing
        results = extract_resumes_from_emails(
            max_emails=args.max_emails,
            start_date=start_date,
            upload_to_pcr=args.upload_to_pcr,
            extractor_type=args.extractor_type
        )
        
        if 'error' in results:
            logger.info(f"Email processing failed: {results['error']}")
            sys.exit(1)
        
        # Display results
        logger.info("\n=== Email Processing Results ===")
        logger.info(f"Total emails found: {results['total_emails_found']}")
        logger.info(f"Emails processed: {results['emails_processed']}")
        logger.info(f"Moved to 'Other' folder: {results.get('moved_to_other', 0)}")
        logger.info(f"Moved to 'PCR-Entered Resumes' folder: {results.get('moved_to_pcr_entered', 0)}")
        logger.info(f"Candidates found: {results['candidates_found']}")
        logger.info(f"Errors: {len(results.get('errors', []))}")
        
        if results['errors']:
            logger.info("\nErrors encountered:")
            for error in results['errors']:
                logger.info(f"  - {error}")
        
        if args.verbose:
            logger.info("\n=== Detailed Results ===")
            for i, result in enumerate(results['results'], 1):
                logger.info(f"\nEmail {i}: {result['email_subject']}")
                logger.info(f"  From: {result['email_sender']}")
                logger.info(f"  Received: {result['email_received']}")
                logger.info(f"  Has resume attachments: {result['has_resume_attachments']}")
                logger.info(f"  Moved to folder: {result.get('moved_to_folder', 'Unknown')}")
                logger.info(f"  Candidates extracted: {len(result['candidates_extracted'])}")
                
                if result['candidates_extracted']:
                    for j, candidate in enumerate(result['candidates_extracted'], 1):
                        name = f"{candidate.get('FirstName', '')} {candidate.get('LastName', '')}" .strip()
                        email_addr = candidate.get('EmailAddress', 'No email')
                        logger.info(f"    Candidate {j}: {name} ({email_addr})")
        
        logger.info("\n=== Processing Complete ===")
        
    except KeyboardInterrupt:
        logger.info("\nOperation cancelled by user")
    except (IOError, OSError, ValueError, RuntimeError, ConnectionError) as e:
        logger.info(f"Error: {str(e)}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description="Resume Extractor and PC Recruiter Integration Tool",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Extract resume to JSON
  python main.py extract "/Users/jacob/Documents/Code/AprovanLabs/lotus/apps/resume-extractor/data/Alan-Witte.pdf" output.json markitdown
  
  # Upload candidate to PC Recruiter (using environment variables)
  python main.py upload-pcr candidate.json
  
  # Extract resume and upload directly to PC Recruiter in one step
  python main.py extract-and-upload resume.pdf
  python main.py extract-and-upload resume.pdf --verbose
  
  # Process emails for resume extraction (sequential, starting from oldest)
  python main.py process-email --max-emails 10
  python main.py process-email --max-emails 10 --start-date 2025-12-01
  
  # Process emails and upload to PC Recruiter with verbose output
  python main.py process-email --max-emails 1 --verbose
  python main.py process-email --max-emails 1 --upload-to-pcr --verbose
  python main.py process-email --max-emails 1 --start-date 2020-03-22T00:00:00
  python main.py process-email --max-emails 1 --start-date 2020-03-13 --upload-to-pcrren-Lepouce_3.pdf
"""
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # Extract resume command
    extract_parser = subparsers.add_parser('extract', help='Extract resume to JSON')
    extract_parser.add_argument('file_path', help='Path to resume file (PDF, DOCX, etc.)')
    extract_parser.add_argument('output', nargs='?', help='Output JSON file path (optional)')
    extract_parser.add_argument('extractor_type', nargs='?', default='auto', 
                               help='Extractor type: auto, markitdown, unstructured (default: auto)')
    
    # Upload to PCR command
    pcr_parser = subparsers.add_parser('upload-pcr', help='Upload candidate to PC Recruiter from JSON')
    pcr_parser.add_argument('json_file', help='Path to JSON file containing candidate data')
    
    # Extract and upload command
    extract_upload_parser = subparsers.add_parser('extract-and-upload', help='Extract resume and upload directly to PC Recruiter')
    extract_upload_parser.add_argument('file_path', help='Path to resume file (PDF, DOCX, etc.)')
    extract_upload_parser.add_argument('--extractor-type', default='auto', 
                                     help='Extractor type: auto, markitdown, unstructured (default: auto)')
    extract_upload_parser.add_argument('--verbose', '-v', action='store_true', 
                                     help='Show detailed extraction and upload results')

    # Process email command
    email_parser = subparsers.add_parser('process-email', help='Process emails for resume extraction sequentially')
    email_parser.add_argument('--max-emails', type=int, default=5, 
                             help='Maximum number of emails to process (default: 5)')
    email_parser.add_argument('--start-date', type=str, 
                             help='Start date for email processing (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)')
    email_parser.add_argument('--upload-to-pcr', action='store_true', 
                             help='Upload extracted candidates to PC Recruiter')
    email_parser.add_argument('--extractor-type', default='auto', 
                             help='Extractor type: auto, markitdown, unstructured (default: auto)')
    email_parser.add_argument('--verbose', '-v', action='store_true', 
                             help='Show detailed results for each email processed')
    
    args = parser.parse_args()
    
    if args.command == 'extract':
        extract_resume_command(args)
    elif args.command == 'upload-pcr':
        upload_pcr_command(args)
    elif args.command == 'extract-and-upload':
        extract_and_upload_command(args)
    elif args.command == 'process-email':
        process_email_command(args)
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
