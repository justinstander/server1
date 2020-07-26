dotenv = require('dotenv')

dotenv.config();

exports.handler = require("./function").callMethod;
