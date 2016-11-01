import express from 'express'
import mongoose from 'mongoose'
import api from './routes/api.js'
import bodyParser from 'body-parser'

let port = process.env.PORT || 3000
let app = express()

mongoose.connect('localhost:27017/testing-personal-note-api')

app.use(bodyParser())

app.use('/api', api)

app.listen(port, ()=>{
  console.log('listening on', port)
})
