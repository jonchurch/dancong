const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/test', (req, res) =>  {
	res.send('it works')
})

module.exports = router
