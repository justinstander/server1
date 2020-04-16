const Http200 = require("./Http200");
const Http403 = require("./Http403");
const Http404 = require("./Http404");
const Http405 = require("./Http405");
const Http422 = require("./Http422");
const Http500 = require("./Http500");

/**
 * Errors
 * 
 * @type {Object} errors keyed by HTTP Status
 */
const error = {
  [Http200.STATUS]: Http200,
  [Http403.STATUS]: Http403,
  [Http404.STATUS]: Http404,
  [Http405.STATUS]: Http405,
  [Http422.STATUS]: Http422,
  [Http500.STATUS]: Http500,
  MODULE_NOT_FOUND: Http500
};

/**
 * HTTP Body Encoding
 * 
 * @type {String}
 */
const BODY_ENCODING = "text";

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
 * Exports
 * @type {Object} exports
 */
module.exports = {
  error,
  Http200,
  Http403,
  Http404,
  Http405,
  response
};
