const status = "405";
const description = "Method Not Allowed";
const name = `Http${status}`;

module.exports = class extends Error {
  static get STATUS() {
    return status;
  }

  static get DESCRIPTION() {
    return description;
  }

  constructor(message, fileName=null, lineNumber=null) {
    super(message, fileName, lineNumber);

    this.name = name;
    this.code = status;
  }
};
