const { Http405 } = require("../errors");

/**
 * API path handler
 * 
 * @param  {String} awsRequestId AWS Request Id
 * @param  {String} method       HTTP Method
 * @param  {Object} body         body from CloudFront
 * @param  {String} querystring  querystring from CloudFront
 * @return {Object}              result of the method call
 */
exports.handler = async (awsRequestId, method, body, querystring) => {
  switch(method) {
    case "GET":
      return await require("./get").handler(querystring);
    case "OPTIONS":
      return null;
    default:
      throw new Http405(`No Method '${method}'`);
  } 
};
