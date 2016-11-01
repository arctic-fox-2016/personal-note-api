var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    name:String,
    age:Number,
    notes: [{
      title:String,
      content:String,
      _id: false
    }]
}, {
  timestamps:true

})

module.exports= mongoose.model('users', userSchema)
