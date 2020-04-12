const _ = require("lodash");
const {
  Http403,
  Http404,
  Http405,
  Http422,
  Http500
} = require("./errors");

// Constants
const EMPTY_STRING = "";
const FORWARD_SLASH = "/";
const BODY_ENCODING = "text";

const HTTP_STATUS_200 = "200";

// Constants - AWS
const REQUEST_URI = "Records[0].cf.request.uri";
const REQUEST_METHOD = "Records[0].cf.request.method";
const REQUEST_BODY = "Records[0].cf.request.body";

const getCustomError = (code, message) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

// Methods
const getPropertyFromEvent = (event, property) => _.get(
  event,
  property,
  EMPTY_STRING
);

const getModule = (name) => {
  switch(name) {
    case "total-cost":
      return require("./total-cost/");
    case "search":
      return require("./search/");
    case Http403.STATUS:
      throw new Http403(`${name} forbidden`);
    default:
      throw new Http404(`${name} Not Found`);
  }
};

const getBody = (event) => getPropertyFromEvent(
  event,
  REQUEST_BODY
);

const getMethod = (event) => getPropertyFromEvent(
  event,
  REQUEST_METHOD
);

const getUri = (event) => getPropertyFromEvent(
  event,
  REQUEST_URI
).substring(1).split(
  FORWARD_SLASH
).filter(
  (item) => (item !== EMPTY_STRING)
);

/**
 * HTTP Headers
 *
 * The Request contains the Origin Header - Set CORS headers
 * headers['access-control-allow-origin'] = [{key: 'Access-Control-Allow-Origin', value: "*"}];
 * headers['access-control-allow-methods'] = [{key: 'Access-Control-Allow-Methods', value: "GET, HEAD"}];
 * headers['access-control-max-age'] = [{key: 'Access-Control-Max-Age', value: "86400"}];
 */
const headers = {
  "access-control-allow-origin": [{key: 'Access-Control-Allow-Origin', value: "http://local.haasandmilan.com:3000"}],
  "access-control-allow-methods": [{key: 'Access-Control-Allow-Methods', value: "GET, HEAD"}],
  "access-control-max-age": [{key: 'Access-Control-Max-Age', value: "86400"}]
};

// Methods - Transaction
const response = (body, status, statusDescription, bodyEncoding = BODY_ENCODING) => ({
  headers,
  body,
  bodyEncoding,
  status,
  statusDescription
});

const internalError = (body) => response(body, Http500.STATUS, Http500.DESCRIPTION);

const notFound = (body) => response(body, Http404.STATUS, Http404.DESCRIPTION);

const forbidden = (body) => response(body, Http403.STATUS, Http403.DESCRIPTION);

const notAllowed = (body) => response(body, Http405.STATUS, Http405.DESCRIPTION);

const unprocessable = (body) => response(body, Http422.STATUS, Http422.DESCRIPTION);

const success = (body) => response(body, HTTP_STATUS_200, "OK");

const getError = ({code, message}) => {
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

const callMethod = async (awsRequestId, name, method, body) => success(
  await getModule(name).handler(awsRequestId, method, body)
);

// Handler
exports.handler = async (event, context) => {
  const uri = getUri(event);

  if (uri.length > 0) {
    return await callMethod(
      context.awsRequestId, 
      uri[0],
      getMethod(event),
      getBody(event)
    ).catch(
      getError
    );
  } else {
    return notFound("Hungry for Apples?");
  }
};
