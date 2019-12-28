// DynamoDB
const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

const TableName = "CostAndUsage";

const clearItems = async () => {
    const { Items } = await dynamodb.scan({
        TableName
    }).promise();
    console.log(Items);
    do {
        await dynamodb.deleteItem({
            TableName,
            Key: {
                AwsRequestId: {
                    S: Items.pop().AwsRequestId.S
                }
            }
        }).promise();
    } while (Items.length > 0);
};

const putItem = async (Item) => {
    await dynamodb.putItem({
        TableName,
        Item
    }).promise();  
    
    return Item;
};
// DynamoDB

// Cost Explorer
const CostExplorer = require('aws-sdk/clients/costexplorer');
const costexplorer = new CostExplorer();

const date = new Date();

const SPLIT = "T";

const getTimePeriod = (month, day) => {
    return new Date(date.getFullYear(), month, day).toISOString().split(SPLIT)[0];
};

const Start = getTimePeriod(date.getMonth(), 1);
const End = getTimePeriod(date.getMonth() + 1, 0);

const Granularity = "MONTHLY";
const Metrics = ["AmortizedCost"];

const TimePeriod = {
    Start,
    End
};

const getCostAndUsage = async () => {
    return await costexplorer.getCostAndUsage({
        TimePeriod,
        Granularity,
        Metrics
    }).promise();
};
// Cost Explorer

exports.handler = async (params, context) => {
    const data = await getCostAndUsage();
    
    await clearItems();
    
    return await putItem({
        AwsRequestId: {
            S: context.awsRequestId
        }, 
        Total: {
            S: `$${data.ResultsByTime[0].Total.AmortizedCost.Amount}`
        }
    });
};
