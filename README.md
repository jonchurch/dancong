

# Botkit React FB Login

## Setup

To run locally, clone the project and enter the directory. Run: 

```
API_ROOT=http://localhost:3001 \
DATABASE=<mongodb_connect_uri> \
APP_ID=<fb_app_id> \
APP_SECRET=<fb_app_secret> \
VERIFY_TOKEN=<fb_verify_token> npm start
```


Minimal example of getting manage_pages and pages_messaging permissions via FB login to setup a Botkit bot.

Uses React to power the frontend, a node express api to interact with a mongodb, and Botkit running on a custom express server.

## Botkit

This project uses a custom branch of the [Botkit](http://github.com/howdyai/botkit) bot framework available [here](https://github.com/jonchurch/botkit/tree/dancong). This branch allows for bailing out of hears triggers by returning true at any point. Returning true will stop execution of that handler, and move on to any other matches based on the original user input.

An example of this behavior is available [here](https://github.com/jonchurch/botkit/blob/dancong/docs/readme.md#control-flow)


