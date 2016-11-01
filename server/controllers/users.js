const models = require('../models/users')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

module.exports = {
  createOne:createOne,
  findAll:findAll,
  findOne:findOne,
  updateOne:updateOne,
  deleteOne:deleteOne,
  authen:authenticate
}

function createOne(req, res, next){
  var paramUsername = _.trim(req.body.username)
  var paramPassword = _.trim(req.body.password)
  var paramEmail = _.trim(req.body.email)

  if(_.isEmpty(paramUsername)){
    res.status(400).json({error:"Username must be filled"})
  } else if(_.isEmpty(paramPassword)){
    res.status(400).json({error:"Password must be filled"})
  } else if(_.isEmpty(paramEmail)){
    res.status(400).json({error:"Email must be filled"})
  } else {
    models.findOne({
      username:paramUsername
    },(err, record) => {
      if(err) throw err
      if(!_.isEmpty(record)){
        res.status(400).json({error:"Username already exists"})
      } else {
        var record = new models({
          username:paramUsername,
          password:null,
          email:paramEmail
        })
        record.password = record.generateHash(paramPassword)
        record.save(function(err){
          if(err) console.log(err)
          else res.status(200).json(record)
        })
      }
    })
  }
}

function findAll(req, res, next){
  models.find({},(err, record) => {
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

function authenticate(req, res, next){
  var paramUsername = _.trim(req.body.username)
  var paramPassword = _.trim(req.body.password)

  if(_.isEmpty(paramUsername)){
    res.status(400).json({error:"Username must be filled"})
  } else if(_.isEmpty(paramPassword)){
    res.status(400).json({error:"Password must be filled"})
  } else {
    models.findOne({
      username:paramUsername,
      password:paramPassword
    },(err, record) => {
      if(err) throw err
      if(!_.isEmpty(record)){
        var tokenValue = jwt.sign({
          "username": record.username
        }, req.app.get('secretToken'), {
          expiresIn: 86400 // expires in 24 hours
        })
        res.status(200).json({
          token: tokenValue
        })
      } else {
        res.status(400).json({error:"Record does not exist"})
      }
    })
  }
}
