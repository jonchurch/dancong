
module.exports = (controller) {
	controller.hears('(.*)', 'message_received', (bot, message) {
		bot.reply(message, 'heard you!')
	})
}
