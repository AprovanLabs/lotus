import logging
from pathlib import Path

from unstructured.partition.pdf import partition_pdf
from unstructured.partition.docx import partition_docx
from unstructured.cleaners.core import clean_extra_whitespace

logger = logging.getLogger(__name__)


class UnstructuredResumeExtractor:
    """Content extractor using Unstructured library to extract text from PDF/DOCX."""
    
    def __init__(self):
        pass

    def extract_content(self, file_path: str) -> str:
        """Extract text content from PDF/DOCX using Unstructured library."""
        path = Path(file_path)
        suffix = path.suffix.lower()
        
        if suffix == '.pdf':
            elements = partition_pdf(filename=file_path, strategy="fast")
        elif suffix == '.docx':
            elements = partition_docx(filename=file_path)
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