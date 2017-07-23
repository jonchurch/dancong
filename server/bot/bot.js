const Botkit = require('botkit')


module.exports = (()=> {
	
// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.facebookbot({
	debug: true,
	receive_via_postback: true,
	verify_token: process.env.VERIFY_TOKEN,
	// access_token: process.env.ACCESS_TOKEN
});


var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/" + file)(controller);
});

// set persistent menu options
require('./components/thread_settings.js')(controller)

// createConfig component
controller.createConfig = require('./components/getConfig')

// Catch-all handler for unmatched input
controller.hears('(.*)', 'message_received', (bot, message) => {
	bot.reply(message, "I don't understand")
})

	return controller
})()
