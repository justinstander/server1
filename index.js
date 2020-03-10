const _ = require("lodash");

const MODULE_NOT_FOUND = "MODULE_NOT_FOUND";

const getUri = (event) => {
  return _.get(
    event,
    "Records[0].cf.request.uri",
    ""
  ).substring(1).split("/").filter((item) => {
    return item !== '';
  });
};

const response = (body, status, statusDescription, bodyEncoding = "text") => ({
  body,
  bodyEncoding,
  status,
  statusDescription
});

const notFound = (body) => response(body, "404", "Not Found");
const forbidden = (body) => response(body, "403", "Forbidden");

const success = (body) => response(body, "200", "OK");

const getError = (code) => {
  console.log('ERROR CODE', code);
  switch(code) {
    case "AccessDeniedException":
      return forbidden("Access Denied");
    case MODULE_NOT_FOUND:
      return notFound("Module Not Found");
    default:
      return notFound("Page Not Found");
  }
};

const callMethod = async (method, event, context) => {
  return success(await require(`./${method}/`).handler(
    event,
    context
  ));
};

exports.handler = async (event, context) => {
  const uri = getUri(event);

  if (uri.length > 0) {
    return await callMethod(uri[0], event, context).catch((error) => {
      console.error(error.message);
      return getError(error.code)
    });
  } else {
    return notFound("Hungry for Apples?");
  }
};
