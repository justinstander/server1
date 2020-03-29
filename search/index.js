const { Http405 } = require("../errors");

exports.handler = async (awsRequestId, method, body) => {
  switch(method) {
    case "POST":
      return await require("./post").handler(body);
    default:
      throw new Http405(`No Method '${method}'`);
  } 
};
