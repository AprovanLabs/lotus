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
$> cd apps/resume-extrator
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

`GET /candidatesV2`

- `ResultsPerPage`: Max of 500
- `Page`: Start at 1
- `Query`: Follows the OData query spec `CandidateId EQ 100004182369727`
