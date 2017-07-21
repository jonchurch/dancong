const mongoose = require('mongoose')

const Bot = mongoose.model('Bot')

exports.createBot = async (req, res) => {
	// need to break these up into key-value objects
	const config_keys = Object.entries(req.body.config).map((ele) => {
		return {key: ele[0], value: ele[1] }
	})
	
	// remove the config field on body, attach the one mongo expects
	delete req.body.config
	req.body.config_keys = config_keys

	const bot = await Bot(req.body)
	res.json(bot)
}

exports.updateBot = async (req, res) => {

}
