const _ = require("lodash");

const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

const TableName = "CostAndUsage";

exports.handler = async (body) => {
  return (await dynamodb.scan({
    TableName,
    FilterExpression: "contains(AwsRequestId, :awsrequestid)", 
    ExpressionAttributeValues: {
      ":awsrequestid": {S: body.search}
    }
  }).promise()).Items;
};
