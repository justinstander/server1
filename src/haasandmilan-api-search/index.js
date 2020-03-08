const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

const TableName = "CostAndUsage";

exports.handler = async (event) => {
    return (await dynamodb.scan({
        TableName,
        FilterExpression: "contains(AwsRequestId, :awsrequestid)", 
        ExpressionAttributeValues: {
            ":awsrequestid": {S: event.search}
        }
    }).promise()).Items;
};
