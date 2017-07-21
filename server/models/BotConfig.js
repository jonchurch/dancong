const mongoose = require('mongoose')

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
			type: String,
			default: String
			
		}
	]


})

module.exports = mongoose.model('BotConfig', botConfigSchema)
