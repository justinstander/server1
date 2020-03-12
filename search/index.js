exports.handler = async (awsRequestId, method, body) => {
  switch(method) {
    case "POST":
      return await require("./post").handler(body);
    default:
      throw new Error(`No Method '${method}'`);
  } 
  
  return method;
};
