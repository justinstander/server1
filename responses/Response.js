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
  "access-control-allow-origin": [{
    key: "Access-Control-Allow-Origin",
    value: "http://localhost:3000"
  }],
   "access-control-allow-methods": [{
    key: "Access-Control-Allow-Methods",
    value: "GET,OPTIONS"
  }],
   "access-control-allow-headers": [{
    key: "Access-Control-Allow-Headers",
    value: "content-type"
  }],
   "access-control-max-age": [{
    key: "Access-Control-Max-Age",
    value: "86400"
  }]
};

module.exports = class extends Object {
  /**
   * Uses #headers
   * 
   * @param  {Object} body              JSON Body
   * @param  {String} status            HTTP Status Code
   * @param  {String} statusDescription HTTP Status Description
   * @param  {String} bodyEncoding      'text' | 'base64' | default #BODY_ENCODING
   * @return {Object}                   HTTP Response
   */
  response(body = null) {
    return {
      headers,
      body: body || this.statusDescription,
      bodyEncoding: BODY_ENCODING,
      status: this.status,
      statusDescription: this.statusDescription
    };
  }
};
