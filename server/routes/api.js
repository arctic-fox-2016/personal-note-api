//create new express router
var express = require('express')
var router = express.Router()
var usersController = require('../controllers/users')

//export router

router.post('/users', usersController.insert)
router.get('/users', usersController.displays)
router.get('/users/:id', usersController.displayOne)
router.put('/users/:id', usersController.update)
router.delete('/users/:id', usersController.deleteitem)

module.exports = router
