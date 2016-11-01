var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Users API
router.post('/api/users', usersController.insert)
router.get('/api/users', usersController.display)
router.put('/api/users/:id', usersController.update)
router.delete('/api/users/:id', usersController.hapus)
router.get('/api/users/:id', usersController.detail)

//Notes API
router.post('/api/notes', usersController.addNote)
router.put('/api/notes/:id', usersController.editNote)
router.delete('/api/notes/:id', usersController.deleteNote)
router.get('/api/notes/:id', usersController.searchByNoteId)


module.exports = router;
