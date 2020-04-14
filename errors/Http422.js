/**
 * HTTP Status Code
 * 
 * @type {String}
 */
const status = "422";

/**
 * Error Description
 * 
 * @type {String}
 */
const description = "Unprocessable Entity";

/**
 * Http422
 * 
 * @type {class}
 */
module.exports = class extends Error {
  /**
   * [STATUS description]
   *
   * @type {String}
   */
  static get STATUS() {
    return status;
  }

  /**
   * [DESCRIPTION description]
   *
   * @type {String}
   */
  static get DESCRIPTION() {
    return description;
  }

  /**
   * Http422
   * 
   * @param  {[type]} message    [description]
   * @param  {[type]} fileName   [description]
   * @param  {[type]} lineNumber [description]
   * @return {[type]}            [description]
   */
  constructor(message, fileName=null, lineNumber=null) {
    super(message, fileName, lineNumber);

    this.name = description;
    this.code = status;
  }
};
