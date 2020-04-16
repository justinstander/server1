const Response = require("./Response");

const status = "403";
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
    return status;
  }

  /**
   * Http403
   * 
   * @return {Http403} instance
   */
  constructor(message) {
    super();

    this.statusDescription = message;
    this.code = STATUS;
  }
};
