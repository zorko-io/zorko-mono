#!/usr/bin/env bash

export DIR=$(cd `dirname $0` && pwd)
export API_SERVER_PATH="${DIR}/../packages/server"
export API_CLIENT_PATH="${DIR}/../packages/client-api"
export E2E_TEST_SUITE="${DIR}/../packages/e2e-test-suite"
export WEB_SERVER_PATH="${DIR}/../packages/web-app"

function startApiServerInBackground() {
    cd "${API_SERVER_PATH}" || exit
    echo "Start API Server in background"
    ts-node -r tsconfig-paths/register src/main.ts &
    API_SERVER_PID=$!
    echo ${API_SERVER_PID}
    TIMEOUT_SEC=20
    echo "Wait for ${TIMEOUT_SEC} sec, to make sure server is up and running"
    sleep ${TIMEOUT_SEC}
    echo "$API_SERVER_PID"
    cd "${DIR}" || exit
}

function loadInitialServerData() {
    cd "${API_SERVER_PATH}" || exit
    echo "Start loading init data"
    ts-node script/load.intit.data.ts
    cd "${DIR}" || exit
}

function startWebServerInBackground() {
    cd "${WEB_SERVER_PATH}" || exit
    echo "Start Web Server in background"
    npm start &
    WEB_SERVER_PID=$!
    echo ${WEB_SERVER_PID}
    TIMEOUT_SEC=20
    echo "Wait for ${TIMEOUT_SEC} sec, to make sure server is up and running"
    sleep ${TIMEOUT_SEC}
    echo "$WEB_SERVER_PID"
    cd "${DIR}" || exit
}

export NODE_ENV="development"
export API_AUTH_ENABLED="false"

startApiServerInBackground
loadInitialServerData

echo "Stop API Server"
kill ${API_SERVER_PID}

export API_AUTH_ENABLED="true"

startApiServerInBackground
startWebServerInBackground

#echo "Start e2e ui tests"
#cd "${E2E_TEST_SUITE}" || exit
#npm run test
#cd "${DIR}" || exit
#
#echo "Stop Web Server"
#kill ${WEB_SERVER_PID}
#
#echo "Stop API Server"
#kill ${API_SERVER_PID}




