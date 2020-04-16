
const getCostAndUsage = require("./CostExplorer").getCostAndUsage;
const {
  clearItems,
  putItem
} = require("./DynamoDB");

/**
 * Looks up Cost and Usage,<br/>
 * Cleares any old values,<br/>
 * Stores the cost and usage total in the DB.
 * 
 * @param  {String} awsRequestId AWS Request ID
 * @return {Object}              response from putItem
 */
exports.handler = async (awsRequestId) => {
  const data = await getCostAndUsage();
  
  await clearItems();
  
  return await putItem({
    AwsRequestId: {
      S: awsRequestId
    }, 
    Total: {
      S: `$${data.ResultsByTime[0].Total.AmortizedCost.Amount}`
    }
  });
};
