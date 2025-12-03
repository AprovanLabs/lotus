# Resume Extractor

The resume extractor is a Python application that automates extracting resume information from email attachments and updated a PCR susyem.

## Getting Started

Setup Python Virtual Environment

```sh
$> python3 -m venv .venv
$> source .venv/bin/activate
```

Install packages

```sh
$> cd apps/resume-extractor
resume-extractor$> python3 -m pip install -r requirements.txt
```

Copy the environment variables file and fill in the required values

```sh
resume-extractor$> cp .env.template .env
```

## Running

```sh
python3 -m src.main docs/sample-resume.pdf
```

## PCR

https://www.pcrecruiter.net/APIDOCS_V2/api-reference/Put_Update_1706.html

https://www.pcrecruiter.net/APIDOCS_V2/additional-references/Candidates-V2.html

`GET /candidatesV2`

- `ResultsPerPage`: Max of 500
- `Page`: Start at 1
- `Query`: Follows the OData query spec `CandidateId EQ 100004182369727`

## References

- https://github.com/shcherbak-ai/contextgem
- https://github.com/opendatalab/MinerU?tab=readme-ov-file
- https://github.com/opendatalab/magic-doc
- https://docling-project.github.io/docling/getting_started/installation/#development-setup
- https://github.com/datalab-to/marker
- https://learn.microsoft.com/en-us/outlook/rest/get-started
- https://docs.langchain.com/oss/python/langchain/overview
- https://docs.langchain.com/oss/python/langchain/overview
