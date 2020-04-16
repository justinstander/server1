const Http200 = require("./Http200");
const Http403 = require("./Http403");
const Http404 = require("./Http404");
const Http405 = require("./Http405");
const Http422 = require("./Http422");
const Http500 = require("./Http500");

/**
 * Errors
 * 
 * @type {Object} errors keyed by HTTP Status
 */
const error = {
  [Http200.STATUS]: Http200,
  [Http403.STATUS]: Http403,
  [Http404.STATUS]: Http404,
  [Http405.STATUS]: Http405,
  [Http422.STATUS]: Http422,
  [Http500.STATUS]: Http500,
  MODULE_NOT_FOUND: Http404,
  ReferenceError: Http500,
  TypeError: Http500
};

/**
 * Exports
 * @type {Object} exports
 */
module.exports = {
  error,
  Http200,
  Http403,
  Http404,
  Http405
};
