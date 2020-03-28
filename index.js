const _ = require("lodash");
const fs = require("fs");

// Constants
const EMPTY_STRING = "";
const FORWARD_SLASH = "/";
const BODY_ENCODING = "text";

const HTTP_STATUS_500 = "500";
const HTTP_STATUS_404 = "404";
const HTTP_STATUS_403 = "403";
const HTTP_STATUS_200 = "200";

// Constants - AWS
const REQUEST_URI = "Records[0].cf.request.uri";
const REQUEST_METHOD = "Records[0].cf.request.method";
const REQUEST_BODY = "Records[0].cf.request.body";

const ERROR_ACCESS_DENIED_EXCEPTION = "AccessDeniedException";
const ERROR_VALIDATION_EXCEPTION = "ValidationException";

// Constants - NodeJS
const ERROR_MODULE_NOT_FOUND = "MODULE_NOT_FOUND";

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
    default:
      throw new Error(`${name} Not Found`);
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

// Methods - Transaction
const response = (body, status, statusDescription, bodyEncoding = BODY_ENCODING) => ({
  body,
  bodyEncoding,
  status,
  statusDescription
});

const internalError = (body) => response(body, HTTP_STATUS_500, "Internal Server Error");

const notFound = (body) => response(body, HTTP_STATUS_404, "Not Found");

const forbidden = (body) => response(body, HTTP_STATUS_403, "Forbidden");

const success = (body) => response(body, HTTP_STATUS_200, "OK");

const getError = ({code, message}) => {
  switch(code) {
    case ERROR_VALIDATION_EXCEPTION:
      return internalError(message);
    case ERROR_ACCESS_DENIED_EXCEPTION:
      return forbidden(message);
    case ERROR_MODULE_NOT_FOUND:
      return notFound(message);
    default:
      return notFound(message);
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
