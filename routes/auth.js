const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/authController');

// GET 
router.get('/login', auth_controller.auth_login_get);

// POST request for login.
router.post('/login', auth_controller.auth_login_post);

// GET request for register.
router.get('/register', auth_controller.auth_register_get);

// POST request for creating User.
router.post('/register', auth_controller.auth_register_post);

// GET request to logout.
router.get('/logout', auth_controller.auth_logout);



module.exports = router;