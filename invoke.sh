#!/bin/bash
./node_modules/.bin/lambda-local -l "./$1/index.js" -h handler -e "./$2/event.json"