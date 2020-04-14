const _ = require("lodash");

/**
 * [EMPTY_STRING description]
 * @type {String}
 */
const EMPTY_STRING = "";

/**
 * [FORWARD_SLASH description]
 * @type {String}
 */
const FORWARD_SLASH = "/";

/**
 * Constants - AWS - URI
 * @type {String}
 */
const REQUEST_URI = "Records[0].cf.request.uri";

/**
 * Constants - AWS - Method
 * @type {String}
 */
const REQUEST_METHOD = "Records[0].cf.request.method";

/**
 * Constants - AWS - Body
 * @type {String}
 */
const REQUEST_BODY = "Records[0].cf.request.body";

/**
 * Constants - AWS - Query String
 * @type {String}
 */
const REQUEST_QUERYSTRING = "Records[0].cf.request.querystring";

/**
 * Uses lodash to get a specific property from the
 * CloudWatch Event
 * 
 * @param  {Object} event    CloudFront event
 * @param  {String} property Desired property
 * @return {Object}          Property | #EMPTY_STRING
 */
const getPropertyFromEvent = (event, property) => _.get(
  event,
  property,
  EMPTY_STRING
);

/**
 * Gets the Body from the CloudFront Event
 * 
 * @param  {Object} event CloudFront Event
 * @return {Object}       Body
 */
const getBody = (event) => getPropertyFromEvent(
  event,
  REQUEST_BODY
);

/**
 * Gets the HTTP Method from the CloudFront Event
 * 
 * @param  {Object} event CloudFront Event
 * @return {String}       HTTP Method
 */
const getMethod = (event) => getPropertyFromEvent(
  event,
  REQUEST_METHOD
);

/**
 * Gets the Query string from the CloudFront Event
 * 
 * @param  {Object} event CloudFront Event
 * @return {String}       Query string
 */
const getQuerystring = (event) => getPropertyFromEvent(
  event,
  REQUEST_QUERYSTRING
);

/**
 * URI filter. Removes empty strings
 * 
 * @param  {String} item  uri element
 * @return {Boolean}      true | false
 */
const uriFilter = (item) => (item !== EMPTY_STRING);

/**
 * Gets the URI from the CloudFront Event
 * 
 * @param  {Object} event  CloudFront Event
 * @return {Array}         URI
 */
const getUri = (event) => getPropertyFromEvent(
  event,
  REQUEST_URI
).substring(1).split(
  FORWARD_SLASH
).filter(
  uriFilter
);

/**
 * Exports
 * @type {Object} exports
 */
module.exports = {
  getBody,
  getMethod,
  getQuerystring,
  getUri
};