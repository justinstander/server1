const _ = require("lodash");
const querystring = require("querystring");

const { Http422 } = require("../../../responses");

const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

/**
 * DynamoDB Table Name
 * 
 * @type {String}
 */
const TableName = "CostAndUsage";

/**
 * Filter for AWS Request ID search
 * 
 * @type {String}
 */
const FilterExpression = "contains(AwsRequestId, :awsrequestid)";

/**
 * Takes query parameters and retuns
 * the search results from the DynamoDB Table
 * 
 * @param  {String} query Query string
 * @return {String}       JSON String
 */
exports.handler = async (query) => {
  if(!query) {
    throw new Http422("Missing search query");
  }

  const { search } = querystring.parse(query);
  if(!search) {
    throw new Http422("Missing search parameter");
  }

  return (await dynamodb.scan({
    TableName,
    FilterExpression, 
    ExpressionAttributeValues: {
      ":awsrequestid": {S: search}
    }
  }).promise()).Items;
};
