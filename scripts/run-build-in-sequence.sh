#!/usr/bin/env bash

export DIR=$(cd `dirname $0` && pwd)

export DTO_PATH="${DIR}/../packages/dto"
export REMOTE_API_PATH="${DIR}/../packages/remote-api"
export CLIET_API_PATH="${DIR}/../packages/client-api"

cd "${DTO_PATH}" || exit
npm run build
cd "${DIR}" || exit


cd "${REMOTE_API_PATH}" || exit
npm run build
cd "${DIR}" || exit

cd "${CLIET_API_PATH}" || exit
npm run build
cd "${DIR}" || exit
