const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const pageSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	access_token: {
		type: String,
		required: true
	},
	bots: [
		{
			type: mongoose.Schema.ObjectId
			required: false,
			ref: "Bot"
		}
	],
	created_by: {
		type: String,
		required: true
	}
	
})

function autopopulate(next) {
	  this.populate('reviews');
	  next();
}

// populate all refs to bots when reading a single page
pageSchema.pre('findOne', autopopulate)

module.exports = mongoose.model('Page', pageSchema)
