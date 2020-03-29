const status = "422";
const description = "Unprocessable Entity";

module.exports = class extends Error {
  static get STATUS() {
    return status;
  }

  static get DESCRIPTION() {
    return description;
  }

  constructor(message, fileName=null, lineNumber=null) {
    super(message, fileName, lineNumber);

    this.name = description;
    this.code = status;
  }
};
