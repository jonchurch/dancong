const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()


module.exports = (controller) => {

const routes = require('./routes')(controller)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/', routes)

controller.webserver = app
	return app
}



