import express from 'express'
import Users from '../models/Users.js'
import Notes from '../models/Notes.js'
let router = express.Router()

router.get('/', (req,res)=>{
  res.send('helo')
})

router.get('/users', (req,res) => {
  Users.find({}).populate('notes.note').exec((err, users)=>{
    if(err){
      res.json({message: 'error', detail: err})
    } else {
      res.json(users)
    }
  })
})

router.get('/users/:id', (req,res) => {
  Users.findById(req.params.id, (err, user)=>{
    if(err){
      res.json({message: 'error', detail: err})
    } else {
      res.json(user)
    }
  })
})

router.post('/users', (req,res) => {
  let newUser = new Users({name: req.body.name, age: req.body.age})
  newUser.save((err,newUser)=>{
    if(err){
      res.json({message: 'error', detail: err})
    } else {
      res.json(newUser)
    }
  })
})

router.put('/users', (req,res)=>{
  console.log(req.body)
  Users.findById(req.body.id, (err,user)=>{
    if(err){
      res.json({message:'error', detail: err})
    } else {
      if(user){
        user.name = req.body.name
        user.age = req.body.age
        user.save((err_save,savedUser)=>{
          if(err_save){
            res.json({message: 'error', detail: err})
          } else {
            res.json(user)
          }
        })
      } else {
        res.json({message:'user is not found'})
      }
    }
  })
})

router.delete('/users', (req,res)=>{
  console.log(req.body)
  Users.findById(req.body.id, (err,user)=>{
    if(err){
      res.json({message:'error', detail: err})
    } else {
      if(user){
        user.remove()
        user.save((err_save,savedUser)=>{
          if(err_save){
            res.json({message: 'error', detail: err})
          } else {
            res.json(user)
          }
        })
      } else {
        res.json({message: 'user is not found'})
      }
    }
  })
})

router.get('/notes/:id', (req,res)=>{
  Notes.findById(req.params.id, (err,note)=>{
    if(err){
      res.json({message: 'error', detail: err})
    } else {
      res.json(note)
    }
  })
})

router.post('/notes', (req,res)=>{
  let newNote = new Notes({userid: req.body.userid, title: req.body.title, content: req.body.content})
  Users.findById(req.body.userid, (err_user, user)=>{
    user.notes.push({note:newNote._id})
    user.save((err_user_save, savedUser)=>{
      newNote.save((err,note)=>{
        if(err){
          res.json({message: 'error', detail: err})
        } else {
          res.json(note)
        }
      })
    })
  })
})

router.put('/notes', (req,res)=>{
  Notes.findById(req.body.noteid, (err_find, note)=>{
    if(err_find){
      res.json({message: "error", detail: err_find})
    } else {
      if(note){
        note.title = req.body.title
        note.content = req.body.content
        note.save((err_save, savedNote)=>{
          if(err_save){
            res.json({message:'error', detail: err_save})
          } else {
            res.json(note)
          }
        })
      } else {
        res.json({message:'note is not found'})
      }
    }
  })
})

router.delete('/notes', (req,res)=>{
  Notes.findById(req.body.noteid, (err_find, note)=>{
    if(err_find){
      res.json({message: "error", detail: err_find})
    } else {
      if(note){
        note.remove()
        note.save((err_save, savedNote)=>{
          if(err_save){
            res.json({message:'error', detail: err_save})
          } else {
            res.json(note)
          }
        })
      } else {
        res.json({message:'note is not found'})
      }
    }
  })
})

export default router
