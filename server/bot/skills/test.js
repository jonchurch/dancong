
const rp = require('request-promise')

module.exports = (controller)=> {

	rp.post({
		url: `${process.env.API_ROOT}/config`,
		json: true,
		body: {
			name: "Greeter",
			desc: "I greet folks",
			config_keys: [
				{ key: "company_name", default: "Acme"},

			]
		}
	})

	controller.hears('^hi$', 'message_received', (bot, message) => {
		// find the config we need for this handler
		const greeter = bot.config.bots.greeter
		console.log({greeter})
		// if greeing bot is not setup or deactivated, return true so the rest of the triggers will be evaluated
		if (! greeter || ! greeter.active) {
			return true
		}
		bot.reply(message, `Welcome to ${greeter.config.greeting}!`)
	})


	controller.hears('^contact$', 'message_received', (bot, message) => {
		const contact = bot.config.bots.contact
		if (! contact || ! contact.active) {
			return true
		}
		bot.reply(message, `Our email is ${contact.config.email}`)
	})

	controller.hears('(.*)', 'message_received', (bot, message) => {
		bot.reply(message, "I don't understand")
	})
}

