const { 
  Http405
} = require("../../responses");

/**
 * Total Cost
 *
 * GET, PUT, OPTIONS
 * 
 * @param  {String} awsRequestId AWS Request ID
 * @param  {String} method       HTTP Method
 * @param  {Object} body         Request Body
 * @return {Object}              Object | null
 */
exports.handler = async (awsRequestId, method, body, querystring) => {
  switch(method) {
    case "GET":
      return (await require("./get").handler());
    case "PUT":
      return (await require("./put").handler(awsRequestId));
    case "OPTIONS":
      return null;
    default:
      throw new Http405(`No Method '${method}'`);
  }
};
