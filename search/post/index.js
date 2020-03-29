const _ = require("lodash");
const { Http422 } = require("../../errors");
const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

const TableName = "CostAndUsage";

exports.handler = async (body) => {
  if(!body || !body.data) {
    throw new Http422("Missing search criteria");
  }

  const string = Buffer.from(body.data, "base64").toString("ascii");

  let search = null;
  try {
    search = JSON.parse(string).search.toString();
  } catch(error) {
    throw new Http422(`Unable to parse JSON Body: ${error.message}: [${string}] [${body.data}]`);
  }

  return (await dynamodb.scan({
    TableName,
    FilterExpression: "contains(AwsRequestId, :awsrequestid)", 
    ExpressionAttributeValues: {
      ":awsrequestid": {S: search}
    }
  }).promise()).Items;
};
