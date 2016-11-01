const mongoose = require('mongoose')
const Schema = mongoose.Schema

var noteSchema = mongoose.Schema({
  title: String,
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports= mongoose.model('notes', noteSchema)
