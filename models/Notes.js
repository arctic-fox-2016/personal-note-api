import mongoose from 'mongoose'

let noteSchema = new mongoose.Schema({
  title: String,
  content: String
})

let Notes = mongoose.model('notes', noteSchema)

export default Notes
