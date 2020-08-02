const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

/**
 * DynamoDB Table Name
 * 
 * @type {String}
 */
const TableName = "HaasandmilanChat";

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
 * Deletes the key from the table
 * 
 * @param  {[type]} Key [description]
 * @return {[type]}     [description]
 */
const deleteItem = async (Key) => {
  return (await dynamodb.deleteItem({
    TableName,
    Key
  }).promise());
}

/**
 * Returns alls the items in the chat table
 * 
 * @return {[type]} [description]
 */
const getItems = async () => {
  return (await dynamodb.scan({
    TableName
  }).promise()).Items;
}
/**
 * Exports
 * @type {Object} exports
 */
module.exports = {
  getItems,
  putItem,
  deleteItem
};