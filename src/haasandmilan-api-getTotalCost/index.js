const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

const TableName = "CostAndUsage";
const Limit = 1;

exports.handler = async (params, context) => {
    const Items = (await dynamodb.scan({TableName, Limit}).promise()).Items;
    
    const current = Items[0] || {Total:{S:null}};
    const total = current.Total || {S:null};
    
    return total.S;
};