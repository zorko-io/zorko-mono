#!/usr/bin/env bash

function startServerInBackground() {
    echo "Start server in background"
    ts-node -r tsconfig-paths/register src/main.ts &
    SERVER_PID=$!
    echo ${SERVER_PID}
    TIMEOUT_SEC=20
    echo "Wait for ${TIMEOUT_SEC} sec, to make sure server is up and running"
    sleep ${TIMEOUT_SEC}
    echo "$SERVER_PID"
}

export NODE_ENV="development"
export API_AUTH_ENABLED="false"

startServerInBackground

echo "Start loading init data"
ts-node script/load.intit.data.ts

echo "Stop server"
kill ${SERVER_PID}

export API_AUTH_ENABLED="true"

startServerInBackground

echo "Start e2e tests"
#jest --config ./test/jest-e2e.
npm run test:e2e

echo "Stop server"
kill ${SERVER_PID}




