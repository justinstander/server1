/**
 * HTTP Status Code
 * 
 * @type {String}
 */
const status = "500";

/**
 * Error Description
 * 
 * @type {String}
 */
const description = "Internal Server Error";

/**
 * Http500
 * 
 * @type {class}
 */
module.exports = class extends Error {
  /**
   * [STATUS HTTP Status Code]
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
   * Http500
   * 
   * @param  {[type]} message     [description]
   * @param  {[type]} fileName    [description]
   * @param  {[type]} lineNumber  [description]
   * @return {Http500}            [description]
   */
  constructor(message, fileName=null, lineNumber=null) {
    super(message, fileName, lineNumber);

    this.name = description;
    this.code = status;
  }
};
