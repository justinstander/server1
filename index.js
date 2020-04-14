const _ = require("lodash");

// Constants
const EMPTY_STRING = "";
const FORWARD_SLASH = "/";
const OK = "OK";
const DEFAULT_MESSAGE = "Hungry for Apples?";

/**
 * total-cost path
 * @type {String}
 */
const PATH_TOTAL_COST = "total-cost";

/**
 * search path
 * @type {String}
 */
const PATH_SEARCH = "search";

const {
  Http403,
  Http404,
  Http405,
  Http422,
  Http500
} = require("./errors");

const BODY_ENCODING = "text";
const HTTP_STATUS_200 = "200";

const NOT_FOUND = "Not Found";
const FORBIDDEN = "Forbidden";

// Constants - AWS
const REQUEST_URI = "Records[0].cf.request.uri";
const REQUEST_METHOD = "Records[0].cf.request.method";
const REQUEST_BODY = "Records[0].cf.request.body";
const REQUEST_QUERYSTRING = "Records[0].cf.request.querystring";

/**
 * HTTP Headers
 * 
 * @type {Object}
 */
const headers = {
  'access-control-allow-origin': [{
    key: 'Access-Control-Allow-Origin',
    value: "http://localhost:3000"
  }],
   'access-control-allow-methods': [{
    key: 'Access-Control-Allow-Methods',
    value: 'GET,OPTIONS'
  }],
   'access-control-allow-headers': [{
    key: 'Access-Control-Allow-Headers',
    value: 'content-type'
  }],
   'access-control-max-age': [{
    key: 'Access-Control-Max-Age',
    value: '86400'
  }],
};

/**
 * Uses #headers
 * 
 * @param  {Object} body              JSON Body
 * @param  {String} status            HTTP Status Code
 * @param  {String} statusDescription HTTP Status Description
 * @param  {String} bodyEncoding      'text' | 'base64' | default #BODY_ENCODING
 * @return {Object}                   HTTP Response
 */
const response = (  body, 
                    status,
                    statusDescription,
                    bodyEncoding = BODY_ENCODING ) => ({
  headers,
  body,
  bodyEncoding,
  status,
  statusDescription
});

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
      return require("./total-cost/");
    case PATH_SEARCH:
      return require("./search/");
    case Http403.STATUS:
      throw new Http403(`${name} ${FORBIDDEN}`);
    default:
      throw new Http404(`${name} ${NOT_FOUND}`);
  }
};

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
 * Internal Error: HTTP 500 Response
 * 
 * @param  {Object} body [description]
 * @return {[type]}      [description]
 */
const internalError = (body) => response(
  body, Http500.STATUS, Http500.DESCRIPTION);

/**
 * Not Found: HTTP 404 Response
 * 
 * @param  {Object} body [description]
 * @return {[type]}      [description]
 */
const notFound = (body) => response(
  body, Http404.STATUS, Http404.DESCRIPTION);

/**
 * Forbidden: HTTP 403 Response
 * 
 * @param  {Object} body [description]
 * @return {[type]}      [description]
 */
const forbidden = (body) => response(
  body, Http403.STATUS, Http403.DESCRIPTION);

/**
 * Not Allowed: HTTP 405 Response
 * 
 * @param  {Object} body [description]
 * @return {[type]}      [description]
 */
const notAllowed = (body) => response(
  body, Http405.STATUS, Http405.DESCRIPTION);

/**
 * Unprocessable: HTTP 422 Response
 * 
 * @param  {Object} body [description]
 * @return {[type]}      [description]
 */
const unprocessable = (body) => response(
  body, Http422.STATUS, Http422.DESCRIPTION);

/**
 * Success: HTTP 200 Response
 * 
 * @param  {Object} body [description]
 * @return {Object}      [description]
 */
const success = (body) => response(
  body, HTTP_STATUS_200, OK);

/**
 * Creates a full error Response for the given HTTP Status Code
 * 
 * @param  {String} options.code    Error HTTP Status Code
 * @param  {String} options.message Error Message
 * @return {Object}                 Error HTTP Response
 */
const createError = ({code, message}) => {
  switch(code) {
    case Http500.STATUS:
      return internalError(message);
    case Http403.STATUS:
      return forbidden(message);
    case Http404.STATUS:
      return notFound(message);
    case Http405.STATUS:
      return notAllowed(message);
    case Http422.STATUS:
      return unprocessable(message);
    default:
      return notFound(`${code} ${message}`);
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
const callMethod = async (  awsRequestId,
                            name,
                            method,
                            body,
                            querystring ) => success(
  JSON.stringify(await getModule(name).handler(
    awsRequestId,
    method,
    body,
    querystring
  ))
);

/**
 * Lambda Function
 * 
 * @param  {Object} event   Lambda Event
 * @param  {Object} context Lambda Context
 * @return {Object}         HTTP Response
 */
exports.handler = async (event, context) => {
  const uri = getUri(event);

  return (uri.length > 0) ? 
    await callMethod(
      context.awsRequestId, 
      uri[0],
      getMethod(event),
      getBody(event),
      getQuerystring(event)
    ).catch(
      createError
    ) : success(DEFAULT_MESSAGE);
};
