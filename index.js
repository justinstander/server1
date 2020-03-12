const _ = require("lodash");
const fs = require("fs");

const EMPTY_STRING = "";
const FORWARD_SLASH = "/";
const BODY_ENCODING = "text";
const REQUEST_URI = "Records[0].cf.request.uri";

const ERROR_ACCESS_DENIED_EXCEPTION = "AccessDeniedException";
const ERROR_MODULE_NOT_FOUND = "MODULE_NOT_FOUND";

const modules = (name) => {
  switch(name) {
    case "get-total-cost":
      return require("./get-total-cost/");
    case "put-total-cost":
      return require("./put-total-cost/");
    case "search":
      return require("./search/");
    default:
      throw new Error("Module Not Found");
  }
};

const getUri = (event) => {
  return _.get(
    event,
    REQUEST_URI,
    EMPTY_STRING
  ).substring(1).split(FORWARD_SLASH).filter((item) => {
    return item !== EMPTY_STRING;
  });
};

const response = (body, status, statusDescription, bodyEncoding = BODY_ENCODING) => ({
  body,
  bodyEncoding,
  status,
  statusDescription
});

const notFound = (body) => response(body, "404", "Not Found");

const forbidden = (body) => response(body, "403", "Forbidden");

const success = (body) => response(body, "200", "OK");

const getError = (code) => {
  switch(code) {
    case ERROR_ACCESS_DENIED_EXCEPTION:
      return forbidden("Access Denied");
    case ERROR_MODULE_NOT_FOUND:
      return notFound("Module Not Found");
    default:
      return notFound("Not Found");
  }
};

const callMethod = async (method, event, context) => {
  return success(await modules(method).handler(
    event,
    context
  ));
};

exports.handler = async (event, context) => {
  const uri = getUri(event);

  if (uri.length > 0) {
    return await callMethod(uri[0], event, context).catch((error) => {
      return getError(error.code);
    });
  } else {
    return notFound("Hungry for Apples?");
  }
};
