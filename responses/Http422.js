const Response = require("./Response");

const status = "422";
/**
 * Http422
 * 
 * @type {class}
 */
module.exports = class extends Response {
  /**
   * [STATUS description]
   *
   * @type {String} #status
   */
  static get STATUS() {
    return status;
  }

  /**
   * Http422
   * 
   * @return {Http422}  instance
   */
  constructor() {
    super();

    this.statusDescription = "Unprocessable Entity";
    this.status = status;
  }
};
