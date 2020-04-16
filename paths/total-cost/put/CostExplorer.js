const CostExplorer = require("aws-sdk/clients/costexplorer");
const costexplorer = new CostExplorer();

/**
 * Split string for ISO String
 * 
 * @type {String}
 */
const SPLIT = "T";

/**
 * Now
 * 
 * @type {Date}
 */
const date = new Date();

/**
 * Cost and Usage report granulatiry
 * 
 * @type {String}
 */
const Granularity = "MONTHLY";

/**
 * Cost and Usage report metrics
 * 
 * @type {Array}
 */
const Metrics = ["AmortizedCost"];

/**
 * Creates a new Date object from <br/>
 * a month and day of this year
 * 
 * @param  {Number}     month Month of this year
 * @param  {Number}     day   Day of this year
 * @return {Date}       date instance
 */
const createDate = (month, day) => {
  return new Date(
    date.getFullYear(),
    month,
    day
  ).toISOString().split(SPLIT)[0];
};

/**
 * Time Period Start
 * 
 * @type {Date}
 */
const Start = createDate(date.getMonth()-1, 1);

/**
 * Time Period End
 * 
 * @type {Date}
 */
const End = createDate(date.getMonth() , 0);

/**
 * Time Period
 * 
 * @type {Object}
 */
const TimePeriod = {
  Start,
  End
};

/**
 * Gets the current Cost and Usage data
 * 
 * @return {Object} cost and usage
 */
const getCostAndUsage = async () => {
  return await costexplorer.getCostAndUsage({
    TimePeriod,
    Granularity,
    Metrics
  }).promise();
};

/**
 * Exports 
 * @type {Object} exports
 */
module.exports = { getCostAndUsage };
