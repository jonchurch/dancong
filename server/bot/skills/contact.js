
const rp = require('request-promise')

module.exports = (controller)=> {

	rp.post({
		url: `${process.env.API_ROOT}/config`,
		json: true,
		body: {
			name: "Contact",
			desc: "Contact info",
			config_keys: [
				{ key: "contact_email", default: ""},

			]
		}
	})

	controller.hears('^contact$', 'message_received', (bot, message) => {
		const contact = bot.config.bots.contact
		if (! contact || ! contact.active) {
			return true
		}
		bot.reply(message, `Our email is ${contact.config.contact_email}`)
	})

}

