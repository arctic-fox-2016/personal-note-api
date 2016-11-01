var express = require('express')
var cors = require('cors')
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var app = express()
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
// passport

//tutup passport

app.use(cors())
app.use(morgan('dev')); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


mongoose.connect('mongodb://localhost/notes')



app.use(methodOverride());
app.use('/api', require('./routes/api'))
app.listen(port);
console.log('The magic happens on port ' + port);
