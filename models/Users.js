import mongoose from 'mongoose'

let userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  notes: [
    {
      note: {
        type: mongoose.Schema.ObjectId,
        ref: 'notes'
      }
    }
  ]
})

let Users = mongoose.model('users', userSchema)

export default Users
