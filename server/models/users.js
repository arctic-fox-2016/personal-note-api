// app/models/user.js
// load the things we need
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = mongoose.Schema({
    name: String,
    age: Number,
    notes: [{
        title: String,
        content:String,
    }]
}, {
    timestamps: true
});


// create the model for users and expose it to our app
module.exports = mongoose.model('users', userSchema); // nama collection
