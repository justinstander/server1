/**
 * HTTP 403 Forbidden
 * 
 * @type {Object}
 */
const Forbidden = {
  status: "403",
  statusDescription: "Forbidden"
};

/**
 * HTTP 500 Internal Server Error
 * 
 * @type {Object}
 */
const InternalServerError = {
  status: "500",
  statusDescription: "Internal Server Error"
};

// const INTERNAL_SERVER_ERROR_STATUS = "500";
// const INTERNAL_SERVER_ERROR_STATUS_DESC

/**
 * HTTP 404 Not Found Error
 * 
 * @type {Object}
 */
const NotFound = {
  status: "404",
  statusDescription: "Not Found"
}

/**
 * Exports
 * @type {Object} exports
 */
module.exports = {
  Forbidden,
  InternalServerError
}