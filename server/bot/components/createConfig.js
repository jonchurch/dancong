
const rp = require('request-promise')

module.exports = (config) => {
	return rp.post({
		url: `${process.env.API_ROOT}/config`,
		json: true,
		body: config
	})
}
