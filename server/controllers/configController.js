const mongoose = require('mongoose')

const Config = mongoose.model('Config')

exports.getAllConfig = async (req, res) => {
	const config = await Config.find({}).exec()
	res.json(config)
}

exports.createConfig = async (req, res) => {
	console.log('Got config post!')
	const config = await (new Config(req.body)).save()
	res.json(config)
}
