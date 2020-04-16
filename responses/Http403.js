const Response = require("./Response");

/**
 * Http403
 * 
 * @type {Class}
 */
module.exports = class extends Response {
  /**
   * [STATUS HTTP Status Code]
   *
   * @return {String} #status
   */
  static get STATUS() {
    return "403";
  }

  /**
   * Http403
   * 
   * @return {Http403} instance
   */
  constructor(message) {
    super();

    this.statusDescription = message;
    this.code = HttpStatus.Forbidden.status;
  }
};
