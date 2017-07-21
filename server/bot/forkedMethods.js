const api_root = 'http://localhost:3001'

exports.handleWebhookPayload = (req, res, bot) => {


        var obj = req.body;
        if (obj.entry) {
            for (var e = 0; e < obj.entry.length; e++) {
				// spawn configed bot for this page!
				//
				//
				// const page_id = obj.entry[e]
				console.log('obj.entr:',obj.entry[e].recipient)
				// const config = await rp.get(`${api_root}/config/${page_id}}`)
				// console.log({config})
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
