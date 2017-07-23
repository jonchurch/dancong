const mongoose = require('mongoose')

const Bot = mongoose.model('Bot')
const Page = mongoose.model('Page')
const { objectify } = require('../helpers')


exports.createBot = async (req, res) => {
	// if (req.body.config) {

	// // need to break these up into key-value objects
	// req.body.config_keys = objectify(req.body.config) 	
	// delete req.body.config

	// }

	const bot = await Bot.findOneAndUpdate({_id: req.body._id},
		req.body,
		{upsert: true, new: true}
	)
	let page = await Page.findOne({ id: req.params.id})
	console.log({page})

	if  (! page.bots.find((el) => bot._id.equals(el._id))) {
		console.log('=======GETIN REAL PUSHY OVER HERE')
		page.bots.push(bot._id)
		page = await page.save()
	}


	res.json(page)
}

exports.updateBot = async (req, res) => {
	const config_keys = objectify(arr)
	delete req.body.config

	req.body.config_keys = config_keys

	const bot = await Bot.findOneAndUpdate({ _id: req.params.id }, req.body)
	res.json(bot)

}
