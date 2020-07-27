#!/bin/bash

zip -r "$1.zip" . -x "node_modules/*" -i "*.js" && \
zip -r "$1.zip" . -i "./node_modules/lodash/*" && \
zip -r "$1.zip" . -i "./node_modules/dotenv/*" && \
aws lambda update-function-code --function-name "$1" --zip-file "fileb://$1.zip" && \
aws lambda publish-version --function-name "$1" && \
rm "$1.zip"
