const mongoose = require('mongoose')

const Bot = mongoose.model('Bot')
const Page = mongoose.model('Page')
const { objectify } = require('../helpers')


exports.createBot = async (req, res) => {
	let page, bot
	
	page = await Page.findOne({ id: req.params.id})

	if (! req.body._id) {
		//create new bot, update page record
		bot = await (new Bot(req.body)).save()

		console.log('=======GETIN REAL PUSHY OVER HERE')
		page.bots.push(bot._id)
		page = await page.save()

	} else {
		// update existing bot
		bot = await Bot.findOneAndUpdate({_id: req.body._id},
			req.body,
			{new: true}
		)
	}

	res.json(bot)
}

exports.updateBot = async (req, res) => {
	const config_keys = objectify(arr)
	delete req.body.config

	req.body.config_keys = config_keys

	const bot = await Bot.findOneAndUpdate({ _id: req.params.id }, req.body)
	res.json(bot)

}
