const mongoose = require('mongoose')

// require('dotenv').config({path: '/.env'})

mongoose.connect(process.env.DATABASE, {
	useMongoClient: true
})
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
	console.error(`Oh no! Mongo error!: ${err.message}`)
	console.log('db env:', process.env.DATABASE)
})

// require mongoose models
require('./models/Page')
require('./models/Config')
require('./models/Bot')



const app = require('./app')

app.set('port', process.env.PORT || 3001)

const server = app.listen(process.env.PORT || 3001, () => {
	console.log(`Express running on port ${server.address().port}`)
})
