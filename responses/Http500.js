const Response = require("./Response");

const status = "500";
/**
 * Http500
 * 
 * @type {class}
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
   * Http500
   * 
   * @return {Http500}  instance
   */
  constructor() {
    super();

    this.statusDescription = "Internal Server Error";
    this.status = status;
  }
};
