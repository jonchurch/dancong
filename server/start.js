const mongoose = require('mongoose')

// require mongoose models
// require('./models/Bot')
// Page.js


const app = require('./app')

app.set('port', process.env.PORT || 3001)

const server = app.listen(process.env.PORT || 3001, () => {
	console.log(`Express running on port ${server.address().port}`)
})
