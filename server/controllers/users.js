var Users = require('../models/users')

module.exports = {
    insert: insert,
    displays: displays,
    displayOne: displayOne,
    update: update,
    deleteitem: deleteitem,
    addNote:addNote,
    getNote:getNote,
    editNote:editNote,
    deleteNote:deleteNote
  }

function insert(req, res, next) {

    var users = new Users({
        name: req.body.name,
        age: req.body.age,
        title:req.body.title,
        content:req.body.content,
        id:req.body.id
    })
    // users.notes.push({
    //     title: req.body.title,
    //     content: req.body.content
    // })
    users.save((err) => {
        if (err)
            throw err
        res.json(users)
        console.log(users);
    })

}

function addNote(req, res, next) {
  console.log("addnotess");
  Users.findOne({
      _id: req.params.id
  }, (err, users) => {
      //update the book
      users.notes.push({
        title:req.body.title,
        content:req.body.content
      })
      users.save((err)=>{
        if(err)
          throw err
        res.json(users)
      })
  })

}

function displays(req, res) {
  console.log("JALANKAN");
    Users.find({}, (err, users) => {
        res.json(users)
    })
}

function displayOne(req, res) {
    Users.findOne({
        _id: req.params.id
    }, (err, users) => {
        //update the book
        res.json(users)
    })
}


function getNote(req, res) {
    Users.findOne({
        'notes._id': req.params.id
    }, (err, users) => {


      res.json(users.notes.filter(function(a){ return a._id == req.params.id })[0])

          // for(let i=0;i<users.notes.length;i++){
          //   if(err)
          //   return
          //   else if (users.notes[i]._id == req.params.id){
          //     res.json(users.notes[i])
          //   }
          // }


    })
}



function editNote(req, res) {
    Users.findOne({
        'notes._id': req.params.id
    }, (err, users) => {



      for(let i=0;i<users.notes.length;i++){
        if(err)
        return
        else if (users.notes[i]._id == req.params.id){
          users.notes[i].title = req.body.title,
          users.notes[i].content = req.body.content
          users.save((err)=>{
              if(err)
                throw err
                res.json(users.notes[i])
          })

        }
      }

    })
}


function deleteNote(req, res) {
    Users.findOne({
        'notes._id': req.params.id
    }, (err, users) => {
      for(let i=0;i<users.notes.length;i++){
        if(err)
        return
        else if (users.notes[i]._id == req.params.id){

            users.notes[i].remove((err,users)=>{
              res.json({
                "messages":"file deleted"
              })
            })



        }
      }

    })
}


function update(req, res) {

    //finding a current book
    Users.findOne({
        _id: req.params.id
    }, (err, users) => {
        //update the book
        users.name = req.body.name,
            users.age = req.body.age,
            users.notes[0].title = req.body.title,
            users.notes[0].content = req.body.content
        users.save((err) => {
            if (err)
                throw err;
            res.json(users)
        })
    })
}
function deleteitem(req, res) {
    Users.remove({
        _id: req.params.id
    }, (err, users) => {
        res.json({
            "messages": "File deleted"
        })
    })
}

function displayOne(req, res) {
    Users.findOne({
        _id: req.params.id
    }, (err, users) => {
        //update the book
        res.json(users)
    })
}
