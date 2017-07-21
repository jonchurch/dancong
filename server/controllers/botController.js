const mongoose = require('mongoose')

const Bot = mongoose.model('Bot')
const Page = mongoose.model('Page')

objectify(arr) => {
	return Object.entries(arr).map((ele) => {
			return {key: ele[0], value: ele[1] }
		})
}

exports.createBot = async (req, res) => {
	// need to break these up into key-value objects
	const config_keys = objectify(req.body.config) 	

	// remove the config field on body, attach the one mongo expects
	delete req.body.config

	req.body.config_keys = config_keys

	const bot = await new (Bot(req.body)).save()
	const page = await Page.findOneAndUpdate(
		{ id: req.body.id }, 
		{ $push: { bots: bot._id} }
	)

	res.json(bot)
}

exports.updateBot = async (req, res) => {
	const config_keys = objectify(arr)
	delete req.body.config

	req.body.config_keys = config_keys

	const bot = await Bot.findOneAndUpdate({ _id: req.params.id }, req.body)
	res.json(bot)

}
