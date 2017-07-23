

const rp = require('request-promise')

module.exports = (controller)=> {
	controller.createConfig({
			name: "Greeter",
			desc: "I greet folks",
			config_keys: [
				{ key: "company_name", default: "Acme"},
			]
		}
)

	controller.hears('^hi$', 'message_received', (bot, message) => {
		// find the config we need for this handler
		const greeterConfig = bot.config.bots.greeter
		// if greeing bot is not setup or deactivated, return true so the rest of the triggers will be evaluated
		if (greeterConfig && greeterConfig.active) {
			bot.reply(message, `Welcome to ${greeterConfig.config.company_name}!`)
		}
			return true
	})

}

