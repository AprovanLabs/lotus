from typing import List, Optional
import yaml
import logging
import os

from .jobbot_spider import JobbotSpider

from scrapy.crawler import CrawlerProcess


_logger = logging.getLogger(__name__)

_JOBBOT_ENV_VAR_PREFIX = "JOBBOT_"


class JobbotScraper:
    """Scrape sources for job postings and candidates"""

    def __init__(
        self,
        catalog_file: str,
        tags: List[str],
        spiders: List[JobbotSpider],
        output_dir: str = "target",
    ):
        self._catalog_file = catalog_file
        self._tags = tags
        self._output_dir = output_dir

        self._catalog = JobbotScraper._parse_catalog(catalog_file)

        self._scrapers = [
            {
                "id": s.get("id"),
                "options": self._load_from_env(s.get("options")),
                "credentials": self._load_from_env(s.get("credentials")),
            }
            for s in self._catalog.get("scrapers")
        ]
        self._spiders = {s.id: s for s in spiders}

    @staticmethod
    def _parse_catalog(catalog_file: str):
        """Parse the catalog file"""
        with open(catalog_file, "r", encoding="utf-8") as stream:
            return yaml.safe_load(stream)

    @staticmethod
    def _load_from_env(
        values: dict,
        env_prefix: Optional[str] = _JOBBOT_ENV_VAR_PREFIX,
    ):
        environment_values = {
            str(k).replace(env_prefix, "").lower(): v
            for k, v in os.environ.items()
            if k.startswith(env_prefix)
        }

        return {
            **values,
            **environment_values,
        }

    def run(self):
        """Run the scraper"""
        _logger.info("Running scraper")

        process = CrawlerProcess(
            settings={
                "BOT_NAME": "jobbot",
                "LOG_LEVEL": "INFO",
                # "CONCURRENT_REQUESTS_PER_DOMAIN": 1,
                "CONCURRENT_REQUESTS": 16,
                "COOKIES_ENABLED": True,
                "REQUEST_FINGERPRINTER_IMPLEMENTATION": "2.7",
                "DOWNLOAD_DELAY": 2,
                # "CLOSESPIDER_ITEMCOUNT": 50,
                "FEEDS": {
                    f"{self._output_dir}/job_history/source=%(name)s/%(time)s.json": {
                        "format": "json",
                        "encoding": "utf8",
                        "item_classes": [
                            "jobbot.scraper.items.JobHistoryItem",
                        ],
                    },
                    f"{self._output_dir}/candidates/source=%(name)s/%(time)s.json": {
                        "format": "json",
                        "encoding": "utf8",
                        "item_classes": [
                            "jobbot.scraper.items.CandidateItem",
                        ],
                    },
                },
            }
        )
        for scraper in self._scrapers:
            process.crawl(
                self._spiders.get(scraper.get("id")),
                options=scraper.get("options", {}),
                credentials=scraper.get("credentials"),
            )

        process.start()
