
const rp = require('request-promise')

module.exports = (controller)=> {
	controller.createConfig({
			name: "Contact",
			desc: "Contact info",
			config_keys: [
				{ key: "contact_email", default: ""},

			]
		}
)
	controller.hears('^contact$', 'message_received', (bot, message) => {
		const contactConfig = bot.config.bots.contact
		if (contactConfig &&  contactConfig.active) {
			bot.reply(message, `Our email is ${contactConfig.config.contact_email}`)
		} else {

			return true
		}
		
	})

}

