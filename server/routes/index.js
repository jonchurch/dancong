const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/test', (req, res) =>  {
	res.send('it works')
})

const { catchErrors } = require('../helpers')
const configController = require('../controllers/configController')
const botController = require('../controllers/botController')
const pageController = require('../controllers/pageController')

// Get Config for react app
router.get('/config', catchErrors(configController.getAllConfig))

// Create config (from bot file)
router.post('/config', catchErrors(configController.createConfig))

// Post Bot to server from react app
router.post('/bot', catchErrors(botController.createBot))
// Update bot 

// Post Page to server from react
router.post('/page', catchErrors(pageController.createPage))
//update page

// Get Page from bot server
router.get('/page/:id', catchErrors(pageController.getPageById))



router.post

module.exports = router
