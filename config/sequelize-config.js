
const {database} = require('./index');

module.exports = {
	development: {
		...database
	},
	local: {
		...database
	},
	test: {},
	production: {}
};