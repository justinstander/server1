#!/bin/bash
cd "./src/$1" && zip -r "$1.zip" *.js && aws lambda update-function-code --function-name $1 --zip-file "fileb://$1.zip" && rm "$1.zip"