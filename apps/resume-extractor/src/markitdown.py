import logging

from markitdown import MarkItDown

logger = logging.getLogger(__name__)


class MarkitdownResumeExtractor:
    """Content extractor using MarkItDown library to convert PDF/DOCX to markdown."""
    
    def __init__(self):
        self.markitdown = MarkItDown()

    def extract_content(self, file_path: str) -> str:
        """Convert PDF/DOCX to markdown using MarkItDown."""
        result = self.markitdown.convert(file_path)
        
        if not result or not result.text_content:
            raise ValueError("No content extracted from file")
        
        return result.text_content
