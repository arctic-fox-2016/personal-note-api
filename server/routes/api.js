const express = require('express')
const router = express.Router()
const users = require('../controllers/users')
const notes = require('../controllers/notes')
const authenHelper = require('../helpers/authenticate')

router.get('/users', users.findAll)
router.get('/users/:id', users.findOne)
router.post('/users', users.createOne)
router.put('/users/:id', authenHelper.token, users.updateOne)
router.delete('/users/:id', authenHelper.token, users.deleteOne)
router.post('/users/authen', users.authen)

router.get('/notes', authenHelper.token, notes.findAll)
router.get('/notes/:id', authenHelper.token, notes.findOne)
router.post('/notes', authenHelper.token, notes.createOne)
router.put('/notes/:id', authenHelper.token, notes.updateOne)
router.delete('/notes/:id', authenHelper.token, notes.deleteOne)

module.exports = router
