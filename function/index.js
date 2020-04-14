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
const createError = ({ status, statusDescription, name, code }) => {
  return new error[status || code]().response(statusDescription || name);
};

/**
 * For security reasons, we must use string literals
 * 
 * @param  {String} name Module name
 * @return {String}      Module's string literal name
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
      throw new Http403(`${name} ${Http403.DESCRIPTION}`);
    default:
      throw new Http404(`${name} ${Http404.DESCRIPTION}`);
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