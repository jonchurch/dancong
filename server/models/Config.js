const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const botConfigSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		required: true
	},
	config_keys: [
		{
			key: String,
			// type: String,
			default: String
			
		}
	]


})

module.exports = mongoose.model('Config', botConfigSchema)
