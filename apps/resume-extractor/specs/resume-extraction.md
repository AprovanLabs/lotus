# Resume Extraction Process

## Technical Implementation

Use LangChain with Unstructured

Alternative, use https://github.com/microsoft/markitdown

## Credentials

Login usernames and passwords should be taken as environment variables:

```txt
PCR_USERNAME=
PCR_PASSWORD=
PCR_BASE_URL=

OUTLOOK_USERNAME=
OUTLOOK_PASSWORD=
OUTBOX_RECUITER_USER=
```

## Overview

### Login Process

_The browser should already be logged-in for the PCR and Outbox email_

1. Log in to PCR with the admin credentials
2. Log in to Outlook
3. In Outlook, switch to recruiter user's inbox

### Email Resolution Process

1. Go to the 'Sent' folder
2. Click through the emails
3. If the email has no resume, send to the 'Other' folder
4. If the email has a resume, open the resume and run the resume extraction process

### Resume Extraction Process

**Note**: There may be multiple resumes in each email. Resumes are attachements (e.g. .pdf, .docx).

1. Copy the name of the person (first and last)
2. Search for the firt and last name in PCR
3. If there is no match, add a new entry
4. If there is a match in PCR, validate the email and phone in the resume match what is in PCR
   - _If no phone number exists, consider it a match_
5. If PCR has newer experience than the resume, ignore the resumt
6. If the resume has newer experience than PCR, add/update PCR with the experience from the resume
7. Once the resume(s) have been processed, move the email to the 'PCR-Entered Resumes' folder

## PCR API Format

### Candidate

```txt
FirstName
LastName
HomePhone
MobilePhone
WorkPhone
EmailAddress
LastModified YYYY-MM-DDTHH:MM:SS Last record modified
UserName Who entered/modified the record
```
