const CostExplorer = require("aws-sdk/clients/costexplorer");
const costexplorer = new CostExplorer();

const date = new Date();

const SPLIT = "T";

const getTimePeriod = (month, day) => {
  return new Date(
    date.getFullYear(),
    month,
    day
  ).toISOString().split(SPLIT)[0];
};

const Start = getTimePeriod(date.getMonth()-1, 1);
const End = getTimePeriod(date.getMonth() , 0);

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

module.exports = { getCostAndUsage }
