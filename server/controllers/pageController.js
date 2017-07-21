const mongoose = require('mongoose')

const Page = mongoose.model('Page')

exports.getPageById = async (req, res) => {
	const page = await Page.findOne({ id: req.params.id })
	res.json(page)
}

exports.createPage = async (req, res) => {
	const page = await (new Page(req.body)).save()
	res.json(page)
}
