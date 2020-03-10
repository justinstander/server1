const _ = require("lodash");

const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

const TableName = "CostAndUsage";

exports.handler = async (event) => {
	const search = _.get(event, 'Records[0].cf.request.body.search');

    return (await dynamodb.scan({
        TableName,
        FilterExpression: "contains(AwsRequestId, :awsrequestid)", 
        ExpressionAttributeValues: {
            ":awsrequestid": {S: search}
        }
    }).promise()).Items;
};
