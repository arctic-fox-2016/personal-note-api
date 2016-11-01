const models = require('../models/notes')
const _ = require('lodash')

module.exports = {
  createOne:createOne,
  findAll:findAll,
  findOne:findOne,
  updateOne:updateOne,
  deleteOne:deleteOne
}

function createOne(req, res, next){
  var paramTitle = req.body.title
  var paramContent = req.body.content
  var paramUser = req.body.user

  if(_.isEmpty(paramTitle)){
    res.status(400).json({error:"Note title must be filled"})
  } else if(_.isEmpty(paramContent)){
    res.status(400).json({error:"Note content must be filled"})
  } else if(_.isEmpty(paramUser)){
    res.status(400).json({error:"User ID must be filled"})
  } else {
    var record = new models({
      title:paramTitle,
      content:paramContent,
      user:paramUser
    })
    record.save()
    res.status(200).json(record)
  }
}

function findAll(req, res, next){
  models.find({}).populate('user').exec((err, record) => {
    if(err) throw err
    if(!_.isEmpty(record)){
      res.status(200).json(record)
    } else {
      res.status(204).json({error:"Cannot find any record"})
    }
  })
}

function findOne(req, res, next){
  models.findOne({
    _id:req.params.id
  },(err, record) => {
    if(err) throw err
    if(!_.isEmpty(record)){
      res.status(200).json(record)
    } else {
      res.status(400).json({error:"Record does not exist"})
    }
  })
}

function updateOne(req, res, next){
  models.findOne({
    _id:req.params.id
  },(err, record) => {
    if(err) throw err
    if(record){
      record.password = req.body.password
      record.save((err)=> {
        if(err) throw err
        res.status(200).json(record)
      })
    } else {
      res.status(400).json({error:"Record does not exist"})
    }
  })
}

function deleteOne(req, res, next){
  models.findOne({
    _id:req.params.id
  },(err, record) => {
    if(err) throw err
    if(record){
      record.remove((err)=> {
        if(err) throw err
        res.status(200).json(record)
      })
    } else {
      res.status(400).json({error:"Record does not exist"})
    }
  })
}
