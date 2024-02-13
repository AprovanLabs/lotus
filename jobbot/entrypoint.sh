#!/bin/sh -l

mkdir -p target && cat catalog.yml | envsubst > target/catalog.yml
python3 jobbot_cli.py scrape \
    -f target/catalog.yml \
    -t $1 \
    -o $2
