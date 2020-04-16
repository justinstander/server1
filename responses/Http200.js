const Response = require("./Response");

const status = "200";
/**
 * Http200
 * 
 * @type {class}
 */
module.exports = class extends Response {
  /**
   * [STATUS description]
   */
  static get STATUS() {
    return status;
  }
  
  /**
   * Http200
   * 
   * @return {Http200} instance
   */
  constructor() {
    super();

    this.status = status;
    this.statusDescription = "OK";
  }
};
