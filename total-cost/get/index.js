const DynamoDB = require("aws-sdk/clients/dynamodb");
const dynamodb = new DynamoDB();

/**
 * DynamoDB Table Name
 * 
 * @type {String}
 */
const TableName = "CostAndUsage";

/**
 * Limit 1
 * 
 * @type {Number}
 */
const Limit = 1;

/**
 * Returns the current total cost
 * 
 * @return {[type]} [description]
 */
exports.handler = async () => {
  const Items = (await dynamodb.scan({TableName, Limit}).promise()).Items;
  
  if( Items.length > 0 ) {
    const { Total } = Items[0];
    return {data: (Total && Total.S)};
  }

  return {data: null};
};
