
module.exports = (controller)=> {

	controller.hears('^hi$', 'message_received', (bot, message) => {
		// find the config we need for this handler
		const greeter = bot.config.bots.greeter
		console.log('=======BOT CONFIG\n', typeof bot.config.bots)
		console.log({greeter})
		// if greeing bot is not setup or deactivated, return true so the rest of the triggers will be evaluated
		if (! greeter || ! greeter.active) {
			return true
		}
		console.log('bot stuff', bot.config.bots)
		bot.reply(message, greeter.config.greeting)
	})
}
