const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

const TableName = "CostAndUsage";

const clearItems = async () => {
  const Items = (await dynamodb.scan({
    TableName
  }).promise()).Items;
  
  while (Items.length > 0) {
    await dynamodb.deleteItem({
      TableName,
      Key: {
        AwsRequestId: {
          S: Items.pop().AwsRequestId.S
        }
      }
    }).promise();
  }
};

const putItem = async (Item) => {
  return (await dynamodb.putItem({
    TableName,
    Item
  }).promise());
};

module.exports = {
  clearItems,
  putItem
}