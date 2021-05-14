#!/bin/bash

DOCKER_IMAGE=kp/electron-builder


SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd $SCRIPT_DIR/..

### Not sure why profile (.profile/.bash_profile/.bashrc) from container is not sourced automatically when running command
###  To get npm installed through nvm we need to source /root/.bashrc
docker run \
    -it \
    --rm \
    -v ${PWD}:/root/project \
    ${DOCKER_IMAGE} \
    /bin/bash \
        --login \
        -i \
        -c "source /root/.bashrc \
            && npm install \
            && npm run package"

