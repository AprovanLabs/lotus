import logging
from pathlib import Path
from typing import Dict, Any
from datetime import datetime

from unstructured.partition.pdf import partition_pdf
from unstructured.partition.docx import partition_docx
from unstructured.cleaners.core import clean_extra_whitespace
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate

from candidate import CandidateInfo

logger = logging.getLogger(__name__)


class UnstructuredResumeExtractor:
    def __init__(self, openai_api_key: str):
        self.llm = ChatOpenAI(model="gpt-4o-mini", temperature=0, openai_api_key=openai_api_key)
        self.parser = PydanticOutputParser(pydantic_object=CandidateInfo)

    def _extract_text(self, file_path: Path) -> str:
        suffix = file_path.suffix.lower()
        
        if suffix == '.pdf':
            elements = partition_pdf(filename=str(file_path), strategy="fast")
        elif suffix == '.docx':
            elements = partition_docx(filename=str(file_path))
        else:
            raise ValueError(f"Unsupported file type: {suffix}")
        
        text_content = []
        for element in elements:
            if hasattr(element, 'text') and element.text:
                cleaned_text = clean_extra_whitespace(element.text)
                text_content.append(cleaned_text)
        
        full_text = '\n'.join(text_content)
        
        if not full_text.strip():
            raise ValueError("No text content found")
        
        return full_text

    def _create_prompt(self) -> PromptTemplate:
        system_prompt = """Extract candidate information from resume text.

Instructions:
1. Extract only explicitly stated information
2. Use null for missing fields
3. Set DateEntered to current timestamp
4. Set Status to "Active", Subjective to 0, HasResume to true

{format_instructions}"""

        user_prompt = """Resume Text:
{resume_text}

Extract candidate information following the schema."""

        return PromptTemplate(
            template=system_prompt + "\n\n" + user_prompt,
            input_variables=["resume_text"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()}
        )

    def _extract_with_llm(self, text: str) -> CandidateInfo:
        prompt_template = self._create_prompt()
        prompt = prompt_template.format(resume_text=text)
        
        messages = [
            SystemMessage(content="You are an expert resume parser."),
            HumanMessage(content=prompt)
        ]
        
        response = self.llm.invoke(messages)
        return self.parser.parse(response.content)

    def extract(self, file_path: str) -> Dict[str, Any]:
        path = Path(file_path)
        
        if not path.exists():
            raise FileNotFoundError(f"File not found: {file_path}")
        
        text = self._extract_text(path)
        
        if len(text.strip()) < 50:
            raise ValueError("Insufficient content")
        
        candidate_info = self._extract_with_llm(text)
        result = candidate_info.model_dump(by_alias=True, exclude_none=False)
        
        result['_metadata'] = {
            'source_file': str(path),
            'extraction_timestamp': datetime.now().isoformat(),
            'extractor': 'unstructured',
            'text_length': len(text)
        }
        
        return result