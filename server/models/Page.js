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
	bots: {
		type: [
		{
			type: mongoose.Schema.ObjectId,
			required: false,
			ref: "Bot"
		}
	],
		default: []
	},
	// created_by: {
	// 	type: String,
	// 	required: true
	// }
	
})

function autopopulate(next) {
	  this.populate('bots');
	this.bots = this.bots.map((ele) => {
		const obj = {
			name: ele.name,
			desc: ele.desc,
			config: {},
			active: ele.active
		}

		for (let i = 0; i < ele.config_keys.length; i += 1) {
			// for each config option, pair its key and value in an obj
			let opt = ele.config_keys[i]
			obj.config[opt.key] = opt.value
		}

		return obj
	})
	// const botObj = {}
	// for (let i = 0; i < bots.length; i += 1) {
	// 	let bot = bots[i]
	// 	botObj[bot.name] = bot
	// }
	  next();
}

// populate all refs to bots when reading a single page
pageSchema.pre('findOne', autopopulate)

module.exports = mongoose.model('Page', pageSchema)
