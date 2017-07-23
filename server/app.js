const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

module.exports = (controller) => {

const routes = require('./routes')(controller)

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../react-ui/build')))

// Serve all our routes
app.use('/', routes)

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
})

controller.webserver = app

return app

}



