
const getCostAndUsage = require("./CostExplorer").getCostAndUsage;
const clearItems = require("./DynamoDB").clearItems;
const putItem = require("./DynamoDB").putItem;

exports.handler = async (awsRequestId) => {
  const data = await getCostAndUsage();

  await clearItems();
  
  return await JSON.stringify(putItem({
    AwsRequestId: {
      S: awsRequestId
    }, 
    Total: {
      S: `$${data.ResultsByTime[0].Total.AmortizedCost.Amount}`
    }
  }));
};
