"""
Resume Extractor CLI Tool

Extract resume to JSON:
$> source .venv/bin/activate
$> python3 main.py extract /Users/jacob/Documents/Code/AprovanLabs/lotus/apps/resume-extractor/data/Resume__MeganSampson.pdf output.json markitdown

Upload candidate to PCR from JSON:
$> python3 main.py upload-pcr /Users/jacob/Documents/Code/AprovanLabs/lotus/apps/resume-extractor/data/output.json

Extract resume and upload directly to PCR in one step:
$> python3 main.py extract-and-upload /Users/jacob/Documents/Code/AprovanLabs/lotus/apps/resume-extractor/data/Resume__MeganSampson.pdf
"""

import sys
import json
import argparse
import logging
import os
from dotenv import load_dotenv
from src.resume import extract_resume_to_json, ResumeExtractor
from src.pcr import PCRClient

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
        extractor = ResumeExtractor(extractor_type=args.extractor_type)
        result = extractor.extract_and_upload_to_pcr(args.file_path)
        
        logger.info(json.dumps(result, indent=2))
        
    except KeyboardInterrupt:
        logger.info("\nOperation cancelled by user")
    except (IOError, OSError, ValueError, RuntimeError, ConnectionError) as e:
        logger.info("Error: %s", str(e))
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description="Resume Extractor and PC Recruiter Integration Tool",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Extract resume to JSON
  python main.py extract resume.pdf output.json markitdown
  
  # Upload candidate to PC Recruiter (using environment variables)
  python main.py upload-pcr candidate.json
  
  # Extract resume and upload directly to PC Recruiter in one step
  python main.py extract-and-upload resume.pdf
  
  # Extract resume and upload with specific extractor type
  python main.py extract-and-upload resume.pdf --extractor-type markitdown
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
    
    args = parser.parse_args()
    
    if args.command == 'extract':
        extract_resume_command(args)
    elif args.command == 'upload-pcr':
        upload_pcr_command(args)
    elif args.command == 'extract-and-upload':
        extract_and_upload_command(args)
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
