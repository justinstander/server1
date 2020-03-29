const status = "404";
const description = "Not Found";

module.exports = class Http405 extends Error {
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
