#!/bin/bash
set -e

CURRENT_DIR="$(pwd)"

SCRIPT_DIR="$( dirname "${BASH_SOURCE[0]}" )"
cd $SCRIPT_DIR

docker build --build-arg NODE_VERSION=14 -f ./Dockerfile -t kp/electron-builder .

cd $CURRENT_DIR
