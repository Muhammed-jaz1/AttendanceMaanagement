require('dotenv').config();
const env = process.env.NODE_ENV;
const configurations = require('./config.json');
process.env.PORT = configurations[env].server.port;


module.exports = configurations[env];