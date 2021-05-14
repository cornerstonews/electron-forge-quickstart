### https://github.com/electron-userland/electron-builder/tree/master/docker

FROM ubuntu:latest

ARG NODE_VERSION=16

WORKDIR /tmp

### Without interactive dialogue
ARG DEBIAN_FRONTEND=noninteractive

### Install required packages
RUN apt-get update \
    && apt-get install -y wget gnupg2 software-properties-common git apt-utils vim dirmngr apt-transport-https ca-certificates locales zip \
    && rm -rf /var/cache/apt/archives /var/lib/apt/lists/*

### Configure locales to Unicode in a Docker Ubuntu
### http://jaredmarkell.com/docker-and-locales/
### http://askubuntu.com/a/601498
ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en' LC_ALL='en_US.UTF-8'
RUN locale-gen en_US.UTF-8
### Configure color support in logs
ENV DEBUG_COLORS true
ENV FORCE_COLOR true

### Install Wine from WineHQ Repository
RUN dpkg --add-architecture i386 \
    && wget -qO- https://dl.winehq.org/wine-builds/Release.key | apt-key add - \
    && apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv F987672F \
    && apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ bionic main' \
    && apt-get update \
    && apt-get install -y --install-recommends winehq-stable \
    && rm -rf /var/cache/apt/archives /var/lib/apt/lists/*

# ### Installing mono
# RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF \
#     && sh -c 'echo "deb https://download.mono-project.com/repo/ubuntu stable-bionic main" > /etc/apt/sources.list.d/mono-official-stable.list' \
#     && apt-get update \
#     && apt-get install -y mono-complete

### Installing NVM, NodeJS and NPM
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
RUN . $HOME/.nvm/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV PROJECT_DIR=/root/project
WORKDIR $PROJECT_DIR
