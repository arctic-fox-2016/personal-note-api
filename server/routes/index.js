var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// User API
router.post('/api/users', usersController.insert)
router.get('/api/users', usersController.display)
router.put('/api/users/:id', usersController.update)
router.delete('/api/users/:id', usersController.hapus)
router.get('/api/users/:id', usersController.detail)

router.post('/api/notes', usersController.addNote)



module.exports = router;
