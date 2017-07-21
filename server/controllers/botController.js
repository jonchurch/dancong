const mongoose = require('mongoose')

const Bot = mongoose.model('Bot')
const Page = mongoose.model('Page')
const { objectify } = require('../helpers')


exports.createBot = async (req, res) => {
	if (req.body.config) {

	// need to break these up into key-value objects
	req.body.config_keys = objectify(req.body.config) 	
	delete req.body.config

	}

	// const bot = await new (Bot(req.body)).save()
	const bot = await ( new Bot(req.body)).save()
	const page = await Page.findOneAndUpdate(
		{ id: req.body.id }, 
		{ $push: { bots: bot._id} },
		{new: true}
	)
	console.log('page from bot controller', page)

	res.json(bot)
}

exports.updateBot = async (req, res) => {
	const config_keys = objectify(arr)
	delete req.body.config

	req.body.config_keys = config_keys

	const bot = await Bot.findOneAndUpdate({ _id: req.params.id }, req.body)
	res.json(bot)

}
