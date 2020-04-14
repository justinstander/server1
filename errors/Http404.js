/**
 * HTTP Status Code
 * 
 * @type {String}
 */
const status = "404";

/**
 * Error Description
 * 
 * @type {String}
 */
const description = "Not Found";

/**
 * Http404
 * 
 * @type {[type]}
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
   * Http404
   * 
   * @param  {String} message     [description]
   * @param  {String} fileName    [description]
   * @param  {Number} lineNumber  [description]
   * @return {Http404}            [description]
   */
  constructor(message, fileName=null, lineNumber=null) {
    super(message, fileName, lineNumber);

    this.name = description;
    this.code = status;
  }
};
