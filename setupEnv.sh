#! /bin/bash

set -e

source tw-env
cp .ci/.env.${ENVIRONMENT} .env
