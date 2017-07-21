const mongoose = require('mongoose')
mongoose.Promise = global.promise


const botSchema = {
	name: {
		type: String,
		required: true
	},
}
