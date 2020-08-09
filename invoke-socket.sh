#!/bin/bash
./node_modules/.bin/lambda-local -l "./index.js" -h handler -t 30 -e "function/socketSendMessageEvent.json"
