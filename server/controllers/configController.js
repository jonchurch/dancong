const mongoose = require('mongoose')

const Config = mongoose.model('Config')

exports.getAllConfig = async (req, res) => {
	const config = await Config.find({})

	res.json(config)
}

exports.createConfig = async (req, res) => {
	const config = await Bot.findOneAndUpdate({ name: req.body.name},
		req.body,
		{upsert: true, new: true}
	)
	res.json(config)
}
