const _ = require("lodash");

const getError = (code) => {
  switch(code) {
    default:
      return "Page not found."
  }
}

const notFound = (body) => ({
  body,
  bodyEncoding: "text",
  status: '404',
  statusDescription: 'Not Found'
});

const response = (body) => ({
  body,
  bodyEncoding: "text",
  status: '200',
  statusDescription: 'OK'
});

const getUri = (event) => {
  return _.get(
    event,
    "Records[0].cf.request.uri",
    ""
  ).substring(1).split("/").filter((item) => {
    return item !== '';
  });
};

const callMethod = async (method, event, context) => {
  return response(await (require(`./${method}/`).handler(
    event,
    context
  )));
};

exports.handler = async (event, context) => {
  const uri = getUri(event);

  if (uri.length > 0) {
    return await (callMethod(uri[0], event, context).catch((error) => {
      return notFound(getError(error.code));
    }));
  }

  return notFound("Hungry for Apples?");
};
