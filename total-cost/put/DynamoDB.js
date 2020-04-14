const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

/**
 * DynamoDB Table Name
 * 
 * @type {String}
 */
const TableName = "CostAndUsage";

/**
 * Deletes all items found in the Table
 * 
 * @return undefined
 */
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

/**
 * Puts the Item in the Table
 * 
 * @param  {Object} Item dynamodb item
 * @return {Object}      
 */
const putItem = async (Item) => {
  return (await dynamodb.putItem({
    TableName,
    Item
  }).promise());
};

/**
 * Exports
 * @type {Object} exports
 */
module.exports = {
  clearItems,
  putItem
};