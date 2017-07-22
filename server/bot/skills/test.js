
module.exports = (controller)=> {

	controller.hears('^hi$', 'message_received', (bot, message) => {
		// find the config we need for this handler
		const greeter = bot.config.bots.greeter
		// if greeing bot is not setup or deactivated, return true so the rest of the triggers will be evaluated
		if (! greeter || ! greeter.active) {
			return true
		}
		bot.reply(message, greeter.config.greeting)
	})


	controller.hears('(.*)', 'message_received', (bot, message) => {
		bot.reply(message, 'I do not understand')
	})
}
