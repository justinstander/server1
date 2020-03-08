const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

const TableName = "CostAndUsage";

exports.handler = async (event) => {
    const { Items } = await dynamodb.scan({
        TableName,
        FilterExpression: "contains(AwsRequestId, :awsrequestid)", 
        ExpressionAttributeValues: {
            ":awsrequestid": {S: event.search}
        }
    }).promise();
    
    return Items;
};
