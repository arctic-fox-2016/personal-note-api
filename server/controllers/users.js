var Users = require('../models/users')

module.exports = {
    insert: insert,
    displays: displays,
    displayOne: displayOne,
    update: update,
    deleteitem: deleteitem
  }

function insert(req, res, next) {

    var users = new Users({
        name: req.body.name,
        age: req.body.age
    })
    users.notes.push({
        title: req.body.title,
        content: req.body.content
    })
    users.save((err) => {
        if (err)
            throw err
        res.json(users)
        console.log(users);
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
