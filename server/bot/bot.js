const Botkit = require('botkit')
const rp = require('request-promise')

module.exports = (()=> {
	
// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.facebookbot({
	// debug: true,
	receive_via_postback: true,
	verify_token: process.env.VERIFY_TOKEN,
});


// set persistent menu options
require('./thread_settings.js')(controller)

// createConfig component
controller.createConfig = (config) => {
	return rp.post({
		url: `${process.env.API_ROOT}/config`,
		json: true,
		body: config
	})
}

// getPageConfig function
// takes a FB payload and returns a Promise that resolves once all api calls have resolved
controller.getPageConfig = async (obj) => {
	let data = []

	await Promise.all(obj.entry.map(async page => {
		const d = await rp.get({
			url: `${process.env.API_ROOT}/page/${page.id}`,
			json: true
			})

		data.push(d)
	}))
	return data
}

// Register all the bots, their triggers, and their configuration
var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/" + file)(controller);
});

// Catch-all handler for unmatched input
controller.hears('(.*)', 'message_received', (bot, message) => {
	bot.reply(message, "I don't understand")
})

	return controller
})()
