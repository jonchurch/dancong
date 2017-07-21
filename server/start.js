const mongoose = require('mongoose')
var Botkit = require('botkit');
var debug = require('debug')('botkit:main');

const { handleWebhookPayload } = ('./bot/forkedMethods')

// require('dotenv').config({path: '/.env'})

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

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.facebookbot({
	// debug: true,
	receive_via_postback: true,
	verify_token: process.env.verify_token,
});

controller.handleWebhookPayload = handleWebhookPayload

var normalizedPath = require("path").join(__dirname, "bot/skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./bot/skills/" + file)(controller);
});

const app = require('./app')(controller)

app.set('port', process.env.PORT || 3001)

const server = app.listen(process.env.PORT || 3001, () => {
	console.log(`Express running on port ${server.address().port}`)
})



