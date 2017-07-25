const mongoose = require('mongoose')
var Botkit = require('botkit');
var debug = require('debug')('botkit:main');
var resolve = require('path').resolve

const { handleWebhookPayload } = require('./bot/forkedMethods')

require('dotenv').config({path: resolve('./.env')})


mongoose.connect(process.env.DATABASE, {
	useMongoClient: true
})
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
	console.error(`Oh no! Mongo error!: ${err.message}`)
})

// require mongoose models
require('./models/Page')
require('./models/Config')
require('./models/Bot')

// Create the Botkit Controller
const controller = require('./bot/bot')

const app = require('./app')(controller)

app.set('port', process.env.PORT || 3001)

const server = app.listen(process.env.PORT || 3001, () => {
	console.log(`Express running on port ${server.address().port}`)
})



