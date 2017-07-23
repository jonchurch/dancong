const Botkit = require('botkit')

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.facebookbot({
	debug: true,
	receive_via_postback: true,
	verify_token: process.env.VERIFY_TOKEN,
	// access_token: process.env.ACCESS_TOKEN
});


var normalizedPath = require("path").join(__dirname, "bot/skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./bot/skills/" + file)(controller);
});

// set persistent menu options
require('./bot/components/thread_settings.js')(controller)

// Catch-all handler for unmatched input
controller.hears('(.*)', 'message_received', (bot, message) => {
	bot.reply(message, "I don't understand")
})
