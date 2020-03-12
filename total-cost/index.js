exports.handler = async (awsRequestId, method, body) => {
  switch(method) {
    case "GET":
      return (await require("./get").handler(awsRequestId, body));
    case "PUT":
      return (await require("./put").handler(awsRequestId, body));
    default:
      throw new Error(`No Method '${method}'`);
  }
  return method;
};
