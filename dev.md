
lets get manage_pages permission from Fb

Okay, so now I have the list of pages from fb, the page access token is included

I think that now all I have to do is subscribe my app to the page, by making 
a graph api call, lets go grab that call
`POST https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=PAGE_ACCESS_TOKEN"`

Okey-dokey, but its not that simple, I want to subscribe the page after the bot is setup, right? lets just POC the call first


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

