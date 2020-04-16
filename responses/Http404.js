const Response = require("./Response");

/**
 * HTTP Status Code
 * 
 * @type {String} "404"
 */
const status = "404";

/**
 * Http404
 * 
 * @type {[type]}
 */
module.exports = class extends Response {

  /**
   * [STATUS]
   *
   * @return {String} #status
   */
  static get STATUS() {
    return status;
  }

  /**
   * Http404
   * 
   * @return {Http404}            [description]
   */
  constructor() {
    super();

    this.status = status;
    this.statusDescription = "Not Found";
  }
};
