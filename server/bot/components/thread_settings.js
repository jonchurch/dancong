var debug = require('debug')('botkit:thread_settings');



module.exports = function(controller) {
	controller.api.messenger_profile.greeting('Hello! I\'m a Botkit bot!');
	controller.api.messenger_profile.get_started('sample_get_started_payload');

    debug('Configuring Facebook thread settings...');
    controller.api.messenger_profile.delete_menu();
	controller.api.messenger_profile.menu([{
        "locale":"default",
        "composer_input_disabled": false,
        "call_to_actions":[
            {
                "title":"My Skills",
                "type":"nested",
                "call_to_actions":[
                    {
                        "title":"Hello",
                        "type":"postback",
                        "payload":"Hello"
                    },
                    {
                        "title":"Hi",
                        "type":"postback",
                        "payload":"Hi"
                    }
                ]
            },
            {
                "type":"web_url",
                "title":"Botkit Docs",
                "url":"https://github.com/howdyai/botkit/blob/master/readme-facebook.md",
                "webview_height_ratio":"full"
            }
        ]
    },
    {
        "locale":"zh_CN",
        "composer_input_disabled":false
    }])

}
