const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')

var app = express()
var port = process.env.PORT || 9000
var configDB = require('./configs/database.js')
var configJWT = require('./configs/jwt.js')

mongoose.connect(configDB.url)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser())
app.set('secretToken', configJWT.secret)

// Set starting routes
app.use('/',require('./routes/api'))

// Set port
app.listen(port)
console.log(`Live on port ${port}`)
