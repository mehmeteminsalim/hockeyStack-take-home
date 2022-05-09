const express = require('express');
const router = express.Router();

const book_instance_controller = require('../controllers/bookinstanceController');

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/create', book_instance_controller.bookinstance_create_get);

// POST request for creating BookInstance.
router.post('/create', book_instance_controller.bookinstance_create_post);

// GET request to delete BookInstance.
router.get('/:id/delete', book_instance_controller.bookinstance_delete_get);

// POST request to delete BookInstance.
router.post('/:id/delete', book_instance_controller.bookinstance_delete_post);

// GET request to update BookInstance.
router.get('/:id/update', book_instance_controller.bookinstance_update_get);

// POST request to update BookInstance.
router.post('/:id/update', book_instance_controller.bookinstance_update_post);

// GET request for one BookInstance.
router.get('/:id', book_instance_controller.bookinstance_detail);

// GET request for list of all BookInstance.
router.get('/', book_instance_controller.bookinstance_list);

module.exports = router;
