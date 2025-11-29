import json
import logging
from pathlib import Path
from typing import Dict, List, Optional, Any
import os

from markitdown_resume_extractor import MarkitdownResumeExtractor
from unstructured_resume_extractor import UnstructuredResumeExtractor  

from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ResumeExtractionError(Exception):
    pass


class ResumeExtractor:
    def __init__(self, extractor_type: str = "auto", openai_api_key: Optional[str] = None):
        self.api_key = openai_api_key or os.getenv('OPENAI_API_KEY')
        if not self.api_key:
            raise ResumeExtractionError("OpenAI API key is required")
        
        self.extractor_type = extractor_type
        self.markitdown_extractor = None
        self.unstructured_extractor = None
        
        if extractor_type == "markitdown" or extractor_type == "auto":
            if MarkitdownResumeExtractor:
                self.markitdown_extractor = MarkitdownResumeExtractor(self.api_key)
                
        if extractor_type == "unstructured" or extractor_type == "auto":
            if UnstructuredResumeExtractor:
                self.unstructured_extractor = UnstructuredResumeExtractor(self.api_key)

    def _get_file_type(self, file_path: str) -> str:
        return Path(file_path).suffix.lower()

    def _choose_extractor(self, file_path: str):
        file_type = self._get_file_type(file_path)
        
        if self.extractor_type == "markitdown" and self.markitdown_extractor:
            return self.markitdown_extractor
        elif self.extractor_type == "unstructured" and self.unstructured_extractor:
            return self.unstructured_extractor
        elif self.extractor_type == "auto":
            if file_type == '.pdf' and self.markitdown_extractor:
                return self.markitdown_extractor
            elif file_type == '.docx' and self.unstructured_extractor:
                return self.unstructured_extractor
            elif self.markitdown_extractor:
                return self.markitdown_extractor
            elif self.unstructured_extractor:
                return self.unstructured_extractor
        
        raise ResumeExtractionError(f"No suitable extractor available for {file_type}")

    def _validate_result(self, result: Dict[str, Any]) -> None:
        if 'EmailAddress' not in result:
            raise ValueError("Email is missing")

    def extract_candidate_from_file(self, file_path: str) -> Dict[str, Any]:
        file_path_obj = Path(file_path)
        
        if not file_path_obj.exists():
            raise ResumeExtractionError(f"File not found: {file_path}")
        
        file_type = self._get_file_type(file_path)
        if file_type not in ['.pdf', '.docx']:
            raise ResumeExtractionError(f"Unsupported file type: {file_type}")
        
        try:
            extractor = self._choose_extractor(file_path)
            result = extractor.extract(file_path)
            self._validate_result(result)

            # Defaults?
            # result['DateEntered'] = datetime.now().isoformat()
            # result['Status'] = 'Active'
            # result['Subjective'] = 0
            # result['HasResume'] = True

            logger.info(f"Successfully processed: {file_path}")
            return result
            
        except Exception as e:
            logger.error(f"Error processing {file_path}: {str(e)}")
            raise ResumeExtractionError(f"Processing failed: {str(e)}")
    
    def process_multiple_files(self, directory: str) -> List[Dict[str, Any]]:
        directory_path = Path(directory)
        
        if not directory_path.exists() or not directory_path.is_dir():
            raise ResumeExtractionError(f"Directory not found: {directory}")
        
        files = list(directory_path.glob("*.pdf")) + list(directory_path.glob("*.docx"))
        
        if not files:
            logger.warning(f"No PDF or DOCX files found in {directory}")
            return []
        
        results = []
        errors = []
        
        for file_path in files:
            try:
                logger.info(f"Processing {file_path.name}")
                candidate_data = self.extract_candidate_from_file(str(file_path))
                results.append(candidate_data)
            except ResumeExtractionError as e:
                logger.error(f"Failed to process {file_path.name}: {str(e)}")
                errors.append({'file': str(file_path), 'error': str(e)})
                continue
        
        logger.info(f"Processed {len(results)} files successfully, {len(errors)} failed")
        return results


def extract_resume_to_json(file_path: str, output_path: Optional[str] = None, 
                          extractor_type: str = "auto") -> str:
    try:
        extractor = ResumeExtractor(extractor_type=extractor_type)
        candidate_data = extractor.extract_candidate_from_file(file_path)
        
        json_output = json.dumps(candidate_data, indent=2, default=str)
        
        if output_path:
            with open(output_path, 'w') as f:
                f.write(json_output)
            logger.info(f"Results saved to: {output_path}")
        
        return json_output
        
    except Exception as e:
        error_msg = f"Resume extraction failed: {str(e)}"
        logger.error(error_msg)
        return json.dumps({"error": error_msg}, indent=2)


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python resume.py <file_path> [output_json_path] [extractor_type]")
        print("Extractor types: auto, markitdown, unstructured")
        sys.exit(1)
    
    file_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else None
    extractor_type = sys.argv[3] if len(sys.argv) > 3 else "auto"
    
    try:
        json_result = extract_resume_to_json(file_path, output_path, extractor_type)
        print(json_result)
    except KeyboardInterrupt:
        print("\nOperation cancelled by user")
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)
