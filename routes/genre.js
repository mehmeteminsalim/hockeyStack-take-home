const express = require('express');
const router = express.Router();

const createGetController = require('../controllers/genres/create-get');
const createPostController = require('../controllers/genres/create-post');
const deleteGetController = require('../controllers/genres/delete-get');
const deletePostController = require('../controllers/genres/delete-post');
const updateGetController = require('../controllers/genres/update-get');
const updatePostController = require('../controllers/genres/update-post');
const indexController = require('../controllers/genres/index');
const listController = require('../controllers/genres/list');


/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/create', createGetController);

// POST request for creating Genre.
router.post('/create', createPostController);

// GET request to delete Genre.
router.get('/:id/delete', deleteGetController);

// POST request to delete Genre.
router.post('/:id/delete', deletePostController);

// GET request to update Genre.
router.get('/:id/update', updateGetController);

// POST request to update Genre.
router.post('/:id/update', updatePostController);

// GET request for one Genre.
router.get('/:id', indexController);

// GET request for list of all Genre.
router.get('/', listController);

module.exports = router;
