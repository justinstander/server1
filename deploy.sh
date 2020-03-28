#!/bin/bash
zip -r "$1.zip" ./**/*.js ./*.js ./node_modules/lodash/** ./package.json && \
aws lambda update-function-code --function-name "$1" --zip-file "fileb://$1.zip" && \
aws lambda publish-version --function-name "$1" && \
rm "$1.zip" && \
./invalidate.sh "$2"
