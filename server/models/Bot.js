const mongoose = require('mongoose')
mongoose.Promise = global.Promise


const botSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		required: true
	},
	config_keys: {
		type: [ { key: String, value: String, } ],
		default: []
	},
	active: {
		type: Boolean,
		default: false
	}

})

module.exports = mongoose.model('Bot', botSchema)
