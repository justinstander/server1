const { 
  error,
  Http200,
  Http403,
  Http404
} = require("../responses");

const {
  getUri,
  getMethod,
  getBody,
  getQuerystring
} = require("../requests");

const {
  getItems,
  putItem,
  deleteItem
} = require("./DynamoDB");

const AWS = require('aws-sdk');
const apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({endpoint:process.env.API_GATEWAY_ENDPOINT});

/**
 * [DEFAULT_MESSAGE]
 * @type {String}
 */
const DEFAULT_MESSAGE = "Hungry for Apples?";

/**
 * total-cost path
 * 
 * @type {String}
 */
const PATH_TOTAL_COST = "total-cost";

/**
 * search path
 * 
 * @type {String}
 */
const PATH_SEARCH = "search";

/**
 * Constructs an error object based on code/status
 * 
 * @param  {string} options.status            HTTP Status Code
 * @param  {String} options.statusDescription HTTP Status Description
 * @param  {String} options.name              Error Name
 * @param  {String} options.code              Error Code
 * @return {Error}                            instance
 */
const createError = ({ status, code, name, statusDescription }) =>
  new error[(status || code || name)]().response(statusDescription);

/**
 * For security reasons, we must use string literals
 * 
 * @param  {String} name Module name
 * @return {Object}      module
 *
 * @throws {Http403, Http404}
 */
const getModule = (name) => {
  switch(name) {
    case PATH_TOTAL_COST:
      return require("../paths/total-cost/");
    case PATH_SEARCH:
      return require("../paths/search/");
    case Http403.STATUS:
      throw new error[Http403.STATUS]();
    default:
      throw new error[Http404.STATUS]();
  }
};

const callMethod = async (event, {awsRequestId}) => {
  const uri = getUri(event);

  if(event.requestContext && event.requestContext.routeKey) {
    try {
      switch(event.requestContext.routeKey) {
        case "$connect":
          await putItem({
            connectionId: { S: event.requestContext.connectionId }
          });
          break;
        case "$disconnect":
          await deleteItem({
            connectionId: { S: event.requestContext.connectionId }
          });
          break;
        case "sendmessage":
          const connections = await getItems()
          
          for(let connection of connections) {
            const ConnectionId = connection.connectionId.S;

            await apiGatewayManagementApi.postToConnection({
              ConnectionId,
              Data: (event.body && `[${event.requestContext.connectionId}] ${(JSON.parse(event.body).data)}`) || ""
            }).promise();
          }
          break;
        default:
          console.warn("Unhandled routeKey:",event.requestContext.routeKey)
      }

      return {
        statusCode: 200
      };
    } catch(error) {
      console.error(error);
      return createError(error);
    }
  } else {
    try {
      return (uri.length > 0) ? new Http200().response(
        JSON.stringify(await getModule(uri[0]).handler(
          awsRequestId,
          getMethod(event),
          getBody(event),
          getQuerystring(event)
        ))
      ) : new Http200().response(DEFAULT_MESSAGE);
    } catch(error) {
      return createError(error);
    }
  }
};

/**
 * Exports
 * @type {Object} exports
 */
module.exports = {
  callMethod
};
