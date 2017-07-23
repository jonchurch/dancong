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
	console.log('bot create req.body', req.body)
	const bot = await Bot.findOneAndUpdate({_id: req.body._id},
		req.body,
		{upsert: true, new: true}
	)
	console.log({bot})
	// const page = await Page.findOneAndUpdate(
	// 	{ id: req.params.id }, 
	// 	{ $push: { bots: bot._id} },
	// 	{new: true}
	// )
	let page = await Page.findOne({ id: req.params.id})
	console.log({page})

	if  (! page.bots.find((el) => bot._id === el._id)) {
		page.bots.push(bot._id)
		page = await page.save()
	}

	console.log('page from bot controller', page)

	res.json(page)
}

exports.updateBot = async (req, res) => {
	const config_keys = objectify(arr)
	delete req.body.config

	req.body.config_keys = config_keys

	const bot = await Bot.findOneAndUpdate({ _id: req.params.id }, req.body)
	res.json(bot)

}
