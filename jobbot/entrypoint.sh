#!/bin/sh -l

# SQLLite migrations
sqitch deploy db:sqlite:$3 && sqitch verify db:sqlite:$3

# Run scraper
mkdir -p target && cat catalog.yml | envsubst > target/catalog.yml
python3 jobbot_cli.py scrape -f target/catalog.yml -t $1 -o $2
