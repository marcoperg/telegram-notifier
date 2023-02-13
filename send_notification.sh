#!/bin/bash

# Load vars
export $(cat .env)

# if [ $# -ne 1 ]; then
#     echo "Usage: send_notification [text]"
#     exit 1
# fi

# Send notificatiosn through web server
TOKEN=$(echo $SECRET | sed 's/"//g')
curl -d "{\"text\": \"$1\"}" \
    -H TOKEN:$TOKEN \
    -H "Content-Type: application/json" \
    -X POST \
    127.0.0.1:3000
echo
exit 0