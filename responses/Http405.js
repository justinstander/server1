const Response = require("./Response");

const status = "405";
/**
 * Http405
 * 
 * @type {class}
 */
module.exports = class extends Response {
  /**
   * [STATUS]
   *
   * @return {String} #string
   */
  static get STATUS() {
    return status;
  }
  /**
   * Http405
   * 
   * @return {Http405} instance
   */
  constructor(method) {
    super();

    this.status = status;
    this.statusDescription = `No Method '${method}'`;
  }
};
