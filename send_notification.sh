#! /bin/bash

# Load vars
ENV_FILE=".env"
if readlink $0 > /dev/null; then
    ENV_FILE="$(readlink $0 | xargs dirname)/.env"
fi
export $(cat $ENV_FILE)

if [ $# -ne 1 ]; then
    echo "Usage: send_notification [text]"
    exit 1
fi

# Send notificatiosn through web server
TOKEN=$(echo $SECRET | sed 's/"//g')
curl -d "{\"text\": \"$1\"}" \
    -H TOKEN:$TOKEN \
    -H "Content-Type: application/json" \
    -X POST \
    127.0.0.1:3000
echo
exit 0
