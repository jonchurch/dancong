const mongoose = require('mongoose')

const Config = mongoose.model('Config')

exports.getAllConfig = async (req, res) => {
	const config = await Config.find({})

	res.json(config)
}

exports.createConfig = async (req, res) => {
	const config = await (new Config(req.body)).save()
	res.json(config)
}
