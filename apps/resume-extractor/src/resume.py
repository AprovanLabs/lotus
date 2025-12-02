import json
import logging
from pathlib import Path
from typing import Dict, List, Optional, Any
import os
from datetime import datetime

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate

from .candidate import CandidateInfo

logger = logging.getLogger(__name__)


class ResumeExtractionError(Exception):
    pass


# Shared LLM Resume Summarization
class ResumeSummarizer:
    """Handles LLM-based extraction of structured candidate information from resume content."""
    
    def __init__(self, openai_api_key: str):
        self.llm = ChatOpenAI(model="gpt-4o-mini", temperature=0, openai_api_key=openai_api_key)
        self.parser = PydanticOutputParser(pydantic_object=CandidateInfo)

    def _create_prompt_template(self) -> PromptTemplate:
        """Create a standardized prompt template for resume extraction."""
        
        system_prompt = f"""Extract candidate information from resume.

Instructions:
1. Extract only explicitly stated information
2. Use null for missing fields
3. Fill in the industry with the best approximation based on work experience (max 20 characters)
4. Pay attention to Markdown headings for document structure

{{format_instructions}}"""

        user_prompt = f"""{{resume_content}}

Extract candidate information following the schema."""

        return PromptTemplate(
            template=system_prompt + "\n\n" + user_prompt,
            input_variables=["resume_content"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()}
        )

    def summarize_resume_content(self, content: str) -> Dict[str, Any]:
        """Use LLM to extract structured candidate information from resume content."""
        if len(content.strip()) < 50:
            raise ValueError("Insufficient content")
        
        prompt_template = self._create_prompt_template()
        prompt = prompt_template.format(resume_content=content)
        
        messages = [
            SystemMessage(content="You are an expert resume parser."),
            HumanMessage(content=prompt)
        ]
        
        response = self.llm.invoke(messages)
        candidate_info = self.parser.parse(response.content)
        
        return candidate_info.model_dump(by_alias=True, exclude_none=False)

    def add_metadata(self, result: Dict[str, Any], file_path: str, extractor_name: str, 
                    content_length: int) -> Dict[str, Any]:
        """Add metadata to the extraction result."""
        result['_metadata'] = {
            'source_file': file_path,
            'extraction_timestamp': datetime.now().isoformat(),
            'extractor': extractor_name,
            'content_length': content_length
        }
        return result


class ResumeExtractor:
    def __init__(self, extractor_type: str = "auto", openai_api_key: Optional[str] = None):
        self.api_key = openai_api_key or os.getenv('OPENAI_API_KEY')
        if not self.api_key:
            raise ResumeExtractionError("OpenAI API key is required")
        
        self.extractor_type = extractor_type
        self.summarizer = ResumeSummarizer(self.api_key)
        self.markitdown_extractor = None
        self.unstructured_extractor = None
        
        # Initialize extractors based on type
        if extractor_type == "markitdown" or extractor_type == "auto":
            try:
                from .markitdown import MarkitdownResumeExtractor
                self.markitdown_extractor = MarkitdownResumeExtractor()
            except ImportError:
                self.markitdown_extractor = None
                
        if extractor_type == "unstructured" or extractor_type == "auto":
            try:
                from .unstructured import UnstructuredResumeExtractor
                self.unstructured_extractor = UnstructuredResumeExtractor()
            except ImportError:
                self.unstructured_extractor = None

    def _get_file_type(self, file_path: str) -> str:
        return Path(file_path).suffix.lower()

    def _choose_extractor(self, file_path: str):
        """Choose the appropriate extractor based on file type and availability."""
        file_type = self._get_file_type(file_path)
        
        if self.extractor_type == "markitdown" and self.markitdown_extractor:
            return self.markitdown_extractor, "markitdown"
        elif self.extractor_type == "unstructured" and self.unstructured_extractor:
            return self.unstructured_extractor, "unstructured"
        elif self.extractor_type == "auto":
            # Try markitdown first for PDFs, unstructured for DOCX
            if file_type == '.pdf' and self.markitdown_extractor:
                return self.markitdown_extractor, "markitdown"
            elif file_type == '.docx' and self.unstructured_extractor:
                return self.unstructured_extractor, "unstructured"
            elif self.markitdown_extractor:
                return self.markitdown_extractor, "markitdown"
            elif self.unstructured_extractor:
                return self.unstructured_extractor, "unstructured"
        
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
            extractor, extractor_name = self._choose_extractor(file_path)
            content = extractor.extract_content(file_path)
            
            result = self.summarizer.summarize_resume_content(content)
            result = self.summarizer.add_metadata(result, file_path, extractor_name, len(content))
            
            self._validate_result(result)

            result['Status'] = 'Candidate'

            logger.info("Successfully processed: %s", file_path)
            return result
            
        except Exception as e:
            logger.error("Error processing %s: %s", file_path, str(e))
            raise ResumeExtractionError(f"Processing failed: {str(e)}") from e

    def process_multiple_files(self, directory: str) -> List[Dict[str, Any]]:
        directory_path = Path(directory)
  
        if not directory_path.exists() or not directory_path.is_dir():
            raise ResumeExtractionError(f"Directory not found: {directory}")
     
        files = list(directory_path.glob("*.pdf")) + list(directory_path.glob("*.docx"))
     
        if not files:
            logger.warning("No PDF or DOCX files found in %s", directory)
            return []
        
        results = []
        errors = []
        
        for file_path in files:
            try:
                logger.info("Processing %s", file_path.name)
                candidate_data = self.extract_candidate_from_file(str(file_path))
                results.append(candidate_data)
            except ResumeExtractionError as e:
                logger.error("Failed to process %s: %s", file_path.name, str(e))
                errors.append({'file': str(file_path), 'error': str(e)})
                continue
        
        logger.info("Processed %d files successfully, %d failed", len(results), len(errors))
        return results


def extract_resume_to_json(file_path: str, output_path: Optional[str] = None, 
                          extractor_type: str = "auto") -> str:
    try:
        extractor = ResumeExtractor(extractor_type=extractor_type)
        candidate_data = extractor.extract_candidate_from_file(file_path)
        
        json_output = json.dumps(candidate_data, indent=2, default=str)
        
        if output_path:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(json_output)
            logger.info("Results saved to: %s", output_path)
        
        return json_output
        
    except (ResumeExtractionError, ValueError, FileNotFoundError) as e:
        error_msg = f"Resume extraction failed: {str(e)}"
        logger.error(error_msg)
        return json.dumps({"error": error_msg}, indent=2)
