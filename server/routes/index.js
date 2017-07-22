const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const requestPromise = require('request-promise')
const rp = requestPromise.defaults({ json: true })

const api_root = 'http://localhost:3001'
const { catchErrors } = require('../helpers')
const configController = require('../controllers/configController')
const botController = require('../controllers/botController')
const pageController = require('../controllers/pageController')



module.exports = (controller) => {

// Get Config for react app
router.get('/config', catchErrors(configController.getAllConfig))

// Create config (from bot file)
router.post('/config', catchErrors(configController.createConfig))

// Post Bot to server from react app
router.post('/bot/:id', catchErrors(botController.createBot))
// Update bot 

// Post Page to server from react
router.post('/page/:id', catchErrors(pageController.createPage))
//update page

// Get Page from bot server
router.get('/page/:id', catchErrors(pageController.getPageById))
router.get('/pages', catchErrors(pageController.getAllPages))



router.post('/facebook/receive', function(req, res) {

	// NOTE: we should enforce the token check here

	// respond to Slack that the webhook has been received.
	res.status(200);
	res.send('ok');

const bot = controller.spawn({})
	// Now, pass the webhook into be processed
	handleWebhookPayload(req, res, bot);

});

router.get('/facebook/receive', function(req, res) {
	if (req.query['hub.mode'] == 'subscribe') {
		if (req.query['hub.verify_token'] == controller.config.verify_token) {
			res.send(req.query['hub.challenge']);
		} else {
			res.send('OK');
		}
	}
});


const handleWebhookPayload = async (req, res, bot) => {


        var obj = req.body;
        if (obj.entry) {
            for (var e = 0; e < obj.entry.length; e++) {
				// spawn configed bot for this page!
				
				const page_id = obj.entry[e].id

				const config = await rp.get(`${api_root}/config/${page_id}`)

				console.log({config})

                for (var m = 0; m < obj.entry[e].messaging.length; m++) {
                    var facebook_message = obj.entry[e].messaging[m];
                    if (facebook_message.message) {
                        var message = {
                            text: facebook_message.message.text,
                            user: facebook_message.sender.id,
                            channel: facebook_message.sender.id,
                            page: facebook_message.recipient.id,
                            timestamp: facebook_message.timestamp,
                            seq: facebook_message.message.seq,
                            is_echo: facebook_message.message.is_echo,
                            mid: facebook_message.message.mid,
                            sticker_id: facebook_message.message.sticker_id,
                            attachments: facebook_message.message.attachments,
                            quick_reply: facebook_message.message.quick_reply,
                            type: 'user_message',
                        };

                        controller.receiveMessage(bot, message);
                    } else if (facebook_message.postback) {

                        // trigger BOTH a facebook_postback event
                        // and a normal message received event.
                        // this allows developers to receive postbacks as part of a conversation.
                        var message = {
                            text: facebook_message.postback.payload,
                            payload: facebook_message.postback.payload,
                            user: facebook_message.sender.id,
                            channel: facebook_message.sender.id,
                            page: facebook_message.recipient.id,
                            timestamp: facebook_message.timestamp,
                            referral: facebook_message.postback.referral,
                        };

                        controller.trigger('facebook_postback', [bot, message]);

                        if (controller.config.receive_via_postback) {
                            var message = {
                                text: facebook_message.postback.payload,
                                user: facebook_message.sender.id,
                                channel: facebook_message.sender.id,
                                page: facebook_message.recipient.id,
                                timestamp: facebook_message.timestamp,
                                type: 'facebook_postback',
                                referral: facebook_message.postback.referral,
                            };

                            controller.receiveMessage(bot, message);
                        }

                    } else if (facebook_message.optin) {

                        var message = {
                            optin: facebook_message.optin,
                            user: facebook_message.sender.id,
                            channel: facebook_message.sender.id,
                            page: facebook_message.recipient.id,
                            timestamp: facebook_message.timestamp,
                        };

                        controller.trigger('facebook_optin', [bot, message]);
                    } else if (facebook_message.delivery) {

                        var message = {
                            delivery: facebook_message.delivery,
                            user: facebook_message.sender.id,
                            channel: facebook_message.sender.id,
                            page: facebook_message.recipient.id
                        };

                        controller.trigger('message_delivered', [bot, message]);
                    } else if (facebook_message.read) {

                        var message = {
                            read: facebook_message.read,
                            user: facebook_message.sender.id,
                            channel: facebook_message.sender.id,
                            page: facebook_message.recipient.id,
                            timestamp: facebook_message.timestamp,
                        };

                        controller.trigger('message_read', [bot, message]);
                    } else if (facebook_message.referral) {
                        var message = {
                            user: facebook_message.sender.id,
                            channel: facebook_message.sender.id,
                            page: facebook_message.recipient.id,
                            timestamp: facebook_message.timestamp,
                            referral: facebook_message.referral,
                        };

                        controller.trigger('facebook_referral', [bot, message]);
                    } else if (facebook_message.account_linking) {
                        var message = {
                            user: facebook_message.sender.id,
                            channel: facebook_message.sender.id,
                            timestamp: facebook_message.timestamp,
                            account_linking: facebook_message.account_linking,
                        };

                        controller.trigger('facebook_account_linking', [bot, message]);
                    }  else {
                        controller.log('Got an unexpected message from Facebook: ', facebook_message);
                    }
                }
            }
        }
    }

return router

}
