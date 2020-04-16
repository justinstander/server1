const { 
  error,
  Http200,
  Http403,
  Http404
} = require("../responses");

const {
  getUri,
  getMethod,
  getBody,
  getQuerystring
} = require("../requests");

/**
 * [DEFAULT_MESSAGE]
 * @type {String}
 */
const DEFAULT_MESSAGE = "Hungry for Apples?";

/**
 * total-cost path
 * 
 * @type {String}
 */
const PATH_TOTAL_COST = "total-cost";

/**
 * search path
 * 
 * @type {String}
 */
const PATH_SEARCH = "search";

/**
 * Constructs an error object based on code/status
 * 
 * @param  {string} options.status            HTTP Status Code
 * @param  {String} options.statusDescription HTTP Status Description
 * @param  {String} options.name              Error Name
 * @param  {String} options.code              Error Code
 * @return {Error}                            instance
 */
const createError = ({ status, code, name, statusDescription }) => {
  return new error[(status || code || name)]().response(statusDescription);
};

/**
 * For security reasons, we must use string literals
 * 
 * @param  {String} name Module name
 * @return {Object}      module
 *
 * @throws {Http403, Http404}
 */
const getModule = (name) => {
  switch(name) {
    case PATH_TOTAL_COST:
      return require("../paths/total-cost/");
    case PATH_SEARCH:
      return require("../paths/search/");
    case Http403.STATUS:
      throw new error[Http403.STATUS]();
    default:
      throw new error[Http404.STATUS]();
  }
};

/**
 * Calls an API Method
 * 
 * @param  {String} awsRequestId Request ID from Lambda Context
 * @param  {String} name         Method Name
 * @param  {String} method       HTTP Method
 * @param  {Object} body         JSON Data
 * @return {Object}              Result of the API call
 */
const callMethod = async (event, {awsRequestId}) => {
  const uri = getUri(event);
  
  try {
    return (uri.length > 0) ? new Http200().response(
      JSON.stringify(await getModule(uri[0]).handler(
        awsRequestId,
        getMethod(event),
        getBody(event),
        getQuerystring(event)
      ))
    ) : new Http200().response(DEFAULT_MESSAGE);
  } catch(error) {
    return createError(error);
  }
};

/**
 * Exports
 * @type {Object} exports
 */
module.exports = {
  callMethod
};
