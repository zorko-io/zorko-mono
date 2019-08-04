#!/usr/bin/env bash

export DIR=$(cd `dirname $0` && pwd)
export SERVER_PATH="${DIR}/../packages/server"
export CLIENT_API_PATH="${DIR}/../packages/client-api"

function startServerInBackground() {
    cd "${SERVER_PATH}" || exit
    echo "Start server in background"
    ts-node -r tsconfig-paths/register src/main.ts &
    SERVER_PID=$!
    echo ${SERVER_PID}
    TIMEOUT_SEC=20
    echo "Wait for ${TIMEOUT_SEC} sec, to make sure server is up and running"
    sleep ${TIMEOUT_SEC}
    echo "$SERVER_PID"
    cd "${DIR}" || exit
}

function loadInitialServerData() {
    cd "${SERVER_PATH}" || exit
    echo "Start loading init data"
    ts-node script/load.intit.data.ts
    cd "${DIR}" || exit
}

export NODE_ENV="development"
export API_AUTH_ENABLED="false"

startServerInBackground
loadInitialServerData

echo "Stop server"
kill ${SERVER_PID}

export API_AUTH_ENABLED="true"

startServerInBackground

echo "Start e2e tests"
cd "${CLIENT_API_PATH}" || exit
npm run test
cd "${DIR}" || exit

echo "Stop server"
kill ${SERVER_PID}




