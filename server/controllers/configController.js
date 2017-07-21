const mongoose = require('mongoose')

const Config = mongoose.model('Config')

exports.getAllConfig = async (req, res) => {
	const config = Config.find({})
}
