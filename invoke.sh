#!/bin/bash
./node_modules/.bin/lambda-local -l "./index.js" -h handler -e "./$1/$2/event.json"
