

module.exports = (controller) => {
	// this is our catchall handler, will trigger if nothing else does
	controller.hears('(.*)', 'message_received', (bot, message) => {
		bot.reply(message, "I don't understand")
	})
}
