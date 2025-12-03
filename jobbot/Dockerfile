# Container image that runs your code
FROM alpine:3.10 as base

COPY poetry.lock pyproject.toml /app/

RUN \
    mkdir /app \
    && apk add --no-cache python3 py3-pip \
    && pip3 install poetry \
    && cd /app \
    && poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

FROM base as dev

COPY --from=python:3.10-alpine3.14 /usr/local/lib/python3.10 /usr/local/lib/python3.10

WORKDIR /app

COPY jobbot jobbot
COPY jobbot_cli.py .
COPY catalog .

ENTRYPOINT ["/entrypoint.sh"]
