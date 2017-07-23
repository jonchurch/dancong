my goal now is to get a staging build ready, so as to be able to hand off the project
I should definitely clean things up a bit, but if I can't even build the damn thing then thats of little importance. I want to put attention to this goal because I really want this off my plate, and I want to go ahead and ship it to the custy so that they can be stoked about it.

IT WORKED HOLY SHIT YES

-----

Why am I fiddling with the react app still?
Let's switch to getting the bot handling two pages
I guess I'm having issues updating the page? lets just check whats going on, do I have access to the page with the bot config after I save it?

-----

I can get a list of "bots" (bot configs), a Page by its page_id, create/update bots, Config, and pages

The react app grabs my pages from FB, I select one, then it shows me a list of bots to setup
I need to get the list of configs available to my page, so I can show the user that list of bots to admin,

I have the list of the configs, now I need to display the bot selector

Displaying a ul of bots for now
onclick, I need to load up the bot they're fiddling with

That entails rendering a form with the bot's information


-----

But wait! I need to get EMPTY configs from the server for my react app!

I also need to store the actual config values the user has entered.

Ultimately, I want to be able to use the bot config like this:

```javascript

page: {
	id: '1232312',
	name: 'DEV-dancong',
	bots: [
		{
			name: 'Greeter',
			desc: 'I greet folks',
			active: true,
			config: {
				default_lang: 'en',
				greeting: 'Howdy',
				goodbye: 'Adios'
			}

		}
	]
}
```

I could probably save the config as sets of key value pairs

```
botConfig: {
	name: 'Greeter',
	desc: 'I say hello to folks',
	config_keys: [
			{
				key: 'default_lang',
				value: 'en',
				type: 'String',
				default: 'en'
			}
	]
}

```

-------

Bot config, before subscribing let's post a config object to our server and save it to mongodb as botconfig

Once you select a page, it will bring up a selector, faq bot or other bot
You select one, it shows you a form with two options

Two new interstitial views, choose bot, fill config

User saves the options, and we post the data to the server

closed the select drawer on page select, now lets make a bot selector

Page: {
	id: 'page_id',
	name: 'My FB Page',
	access_token: 'tokenf',
	bots: [
		{
			name: 'Greeting Bot',
			desc: 'I am here to welcome all humans to their end',
			data: [
				{key: 'value'
			],
			added_by: 'Jon Church',
			active: true
		}
	]
}

do I really need to create models for this? I really am not convinced atm...
	Why Am I making models at all? because the react app will need to be able to get a list from the db of all available bot configs. Each bot will be a new entry into a Bots table, when user loads bot select page, we hit that table to get all bots, we are getting a representation of their config, in order to fill out by the user.

	When we add new bots, we will have to update the table of bots with their config details, that should be done when a new "bot script" is installed on the server, each will be pacakged with its own config details that conform to the Bot model

	Why not use botkit mongo storage for this?
	Not too sure honestly... I can make it work I bet, even if I have to use it to feed the api

-------

lets get manage_pages permission from Fb

Okay, so now I have the list of pages from fb, the page access token is included

I think that now all I have to do is subscribe my app to the page, by making 
a graph api call, lets go grab that call
`POST https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=PAGE_ACCESS_TOKEN"`

Okey-dokey, but its not that simple, I want to subscribe the page after the bot is setup, right? lets just POC the call first


So now I can react to the user selecting a page, lets do something I guess? Grab the config I'll need

-----

Okay! Here we are!

Let's get some requirements in here...

There's no need to integrate with our current bot. But for testing, we suggest to start with 2 chatbots in 2 separate .js file. 
1. A greeting bot. When hears user say "Hi", the bot will reply "Welcome to {company_name}." 
2. A contact bot. When hears user say "Contact" the bot will reply "Our email is {contact_email}."

These 2 bots will default to "I don't understand" if nothing is coded. The variables 'company_name' and 'contact_email' are user inputs.

We'll also have one more chatbot at the end to test adding of new chatbot into the server.

And we'll use 2 Facebook page for testing: FB test page 1 and FB test page 2.

User flow
1. A sign-up/log-in page with Facebook.
2. On successful sign-in, user will see his/her Facebook pages. User select a page to manage and will be prompted for FB Auth.
3. After FB authorization, user will see 2 bots available for activation: Greeting and Contact bot.
4. FB test page 1 will activate both. FB test page 2 will activate only Greeting.
5. On activating Greeting bot, user will see a form to input 'company_name.' This will be stored in MongoDB for the Greeting bot to use. If user change this value, the database should update too.
6. On activating Contact bot, user will see a form to input 'contact_email.'  This is for Contact bot. 

Test
7. If FB test page 1 deactivates Contact bot, it should return "I don't understand' when hears "Contact."
8. If FB test page 2 activates Contact bot, it should return "Our email is {contact_email}" when hears "Contact."
9. If we add a new chatbot js script, the server must be able to show this to user and work when user activates it.

This proof of concept should contain 
- FB auth
- mongodb connection
- one Facebook app managing multiple chatbots for multiple pages 
- dynamically adding new bots to the server without redeploying the server. 

