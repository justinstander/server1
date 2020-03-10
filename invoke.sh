#!/bin/bash
./node_modules/.bin/lambda-local -l "./src/$1/index.js" -h handler -e "./src/$2/event.json"