import logging
from pathlib import Path
from typing import Dict, Any
from datetime import datetime

from markitdown import MarkItDown
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate

from candidate import CandidateInfo

logger = logging.getLogger(__name__)


class MarkitdownResumeExtractor:
    def __init__(self, openai_api_key: str):
        self.llm = ChatOpenAI(model="gpt-4o-mini", temperature=0, openai_api_key=openai_api_key)
        self.parser = PydanticOutputParser(pydantic_object=CandidateInfo)
        self.markitdown = MarkItDown()

    def _convert_to_markdown(self, file_path: Path) -> str:
        result = self.markitdown.convert(str(file_path))
        if not result or not result.text_content:
            raise ValueError("No content extracted from file")
        return result.text_content

    def _create_prompt(self) -> PromptTemplate:
        system_prompt = """Extract candidate information from resume content in Markdown format.

Instructions:
1. Extract only explicitly stated information
2. Use null for missing fields
3. Set DateEntered to current timestamp
4. Set Status to "Active", Subjective to 0, HasResume to true
5. Pay attention to Markdown headings for document structure

{format_instructions}"""

        user_prompt = """Resume Content (Markdown):
{resume_content}

Extract candidate information following the schema."""

        return PromptTemplate(
            template=system_prompt + "\n\n" + user_prompt,
            input_variables=["resume_content"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()}
        )

    def _extract_with_llm(self, content: str) -> CandidateInfo:
        prompt_template = self._create_prompt()
        prompt = prompt_template.format(resume_content=content)
        
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
        
        content = self._convert_to_markdown(path)

        if len(content.strip()) < 50:
            raise ValueError("Insufficient content")
        
        candidate_info = self._extract_with_llm(content)
        result = candidate_info.model_dump(by_alias=True, exclude_none=False)
        
        result['_metadata'] = {
            'source_file': str(path),
            'extraction_timestamp': datetime.now().isoformat(),
            'extractor': 'markitdown',
            'content_length': len(content)
        }
        
        return result