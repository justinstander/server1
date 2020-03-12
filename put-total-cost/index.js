
const getCostAndUsage = require("./CostExplorer").getCostAndUsage;
const clearItems = require("./DynamoDB").clearItems;
const putItem = require("./DynamoDB").putItem;

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
