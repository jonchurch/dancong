
module.exports = (controller) {
	controller.createConfig({
		name: 'Order',
		desc: 'Place orders',
		config_keys: [
			{key: 'item', default: ''}
		]
	})
controller.hears('^order$i', 'message_received', (bot, message) => {
	const orderConfig = bot.config.bots.order
	if (orderConfig && orderConfig.active) {
		bot.reply(message, `I can help you order ${order.config.item}`)
	} else {
		return true
	}
})
	

}
