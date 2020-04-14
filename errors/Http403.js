/**
 * HTTP Status Code
 * 
 * @type {String}
 */
const status = "403";

/**
 * Error Description
 * 
 * @type {String}
 */
const description = "Forbidden";

/**
 * Http403
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
   * [DESCRIPTION Error Description]
   */
  static get DESCRIPTION() {
    return description;
  }

  /**
   * Http403
   * 
   * @param  {String} message     [description]
   * @param  {String} fileName    [description]
   * @param  {Number} lineNumber  [description]
   * @return {Http403}            [description]
   */
  constructor(message, fileName=null, lineNumber=null) {
    super(message, fileName, lineNumber);

    this.name = description;
    this.code = status;
  }
};
