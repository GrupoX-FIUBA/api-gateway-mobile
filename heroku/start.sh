#!/bin/sh

datadog-agent run > /dev/null &
/opt/datadog-agent/embedded/bin/trace-agent --config=/etc/datadog-agent/datadog.yaml > /dev/null &
/opt/datadog-agent/embedded/bin/process-agent --config=/etc/datadog-agent/datadog.yaml > /dev/null &

DD_SERVICE="api-gateway-mobile" \
DD_ENV="prod" \
DD_LOGS_INJECTION=true \
node server.js
