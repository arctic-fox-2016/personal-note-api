var Users = require('../models/users')

module.exports = {
  insert: insert,
  display: display,
  update:update,
  hapus:hapus,
  detail:detail,

  addNote,addNote,
  searchByNoteId,searchByNoteId,
  editNote,editNote,
  deleteNote,deleteNote,
  insertUser:insertUser,
  deleteUser:deleteUser
}

function deleteNote(req,res,next){
  Users.findOne({
    'notes._id':req.params.id
  },(err,items) => {
    for(var i in items.notes){
      if(items.notes[i].id==req.params.id){
        items.notes.splice(i,1)
      }
    }

    items.save((err)=> {
      if(err) throw err
      res.json(items)
    })
  })
}

function editNote(req,res,next){
  Users.findOne({
    'notes._id':req.params.id
  },(err,items) => {
    for(var i in items.notes){
      if(items.notes[i].id==req.params.id){
        items.notes[i].content=req.body.content
        items.notes[i].title=req.body.title
      }
    }

    items.save((err)=> {
      if(err) throw err
      res.json(items.notes.filter(function(a){ return a._id == req.params.id })[0])
    })
  })
}


function searchByNoteId(req,res,next){
  Users.findOne({
    'notes._id':req.params.id
  },(err,items) => {
    res.json(items.notes.filter(function(a){ return a._id == req.params.id })[0])
  })
}

function addNote(req,res,next){
  Users.findOne({
    _id:req.body.id
  },(err,items) => {
      items.notes.push({
        title:req.body.title,
        content: req.body.content
      })
      items.save((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function insert(req,res,next){
    var items = new Users({
      name:req.body.name,
      age:req.body.age
    })
    if(req.body.title!=''&&req.body.content!=''){
      items.notes.push({
        title:req.body.title,
        content: req.body.content
      })
    }
    items.save()
    res.json(items)
}

function update(req,res,next){
  Users.findOne({
    _id:req.params.id
  },(err,items) => {
      items.name = req.body.name
      items.age = req.body.age

      items.save((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function hapus(req,res,next){
  Users.findOne({
    _id:req.params.id
  },(err,items) => {
      if(err)throw err

      items.remove((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function display(req,res,next){
    Users.find({},(err,result) => {
          res.json(result)
    })
}

function detail(req,res,next){
    Users.findOne({
      _id:req.params.id
    },(err,result) => {
          res.json(result)
    })
}



// non API
function deleteUser(req,res,next){
  Users.findOne({
    _id:req.params.id
  },(err,items) => {
      if(err)throw err

      items.remove((err)=> {
        if(err) throw err
        //res.json(items)
        res.redirect('/');
      })
  })
}
function insertUser(req,res,next){
    var items = new Users({
      name:req.body.name,
      age:req.body.age
    })
    items.save()
    //res.json(items)
    res.redirect('/');
}
