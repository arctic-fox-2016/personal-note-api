const express = require('express')
const router = express.Router()
const users = require('../controllers/users')
const authenHelper = require('../helpers/authenticate')

router.get('/users', users.findAll)
router.get('/users/:id', users.findOne)
router.post('/users', users.createOne)
router.put('/users/:id', authenHelper.token, users.updateOne)
router.delete('/users/:id', authenHelper.token, users.deleteOne)

module.exports = router
