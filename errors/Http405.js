/**
 * HTTP Status Code
 * 
 * @type {String}
 */
const status = "405";

/**
 * Error Description
 * 
 * @type {String}
 */
const description = "Method Not Allowed";

/**
 * Error Name
 * 
 * @type {String}
 */
const name = `Http${status}`;

/**
 * Http405
 * 
 * @type {Class}
 */
module.exports = class extends Error {
  /**
   * [STATUS HTTP Status Code]
   */
  static get STATUS() {
    return status;
  }

  /**
   * [DESCRIPTION Error description]
   */
  static get DESCRIPTION() {
    return description;
  }

  /**
   * Http405
   * 
   * @param  {String} message     [description]
   * @param  {String} fileName    [description]
   * @param  {Number} lineNumber  [description]
   * @return {Http405}            [description]
   */
  constructor(message, fileName=null, lineNumber=null) {
    super(message, fileName, lineNumber);

    this.name = name;
    this.code = status;
  }
};
