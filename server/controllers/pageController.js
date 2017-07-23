const mongoose = require('mongoose')

const Page = mongoose.model('Page')

exports.getPageById = async (req, res) => {
	const page = await Page.findOne({ id: req.params.id })
	res.json(page)
}

exports.createPage = async (req, res) => {
	console.log(req.body)

	const page = await Page.findOneAndUpdate({ id: req.params.id },
		req.body,
		{upsert: true, new: true}
	)
	res.json(page)
}

exports.updatePage = async (req, res) => {
	const page = await Page.findOneAndUpdate
}

exports.getAllPages = async (req, res) => {
	const page = await Page.find({})
	res.json(page)
}
