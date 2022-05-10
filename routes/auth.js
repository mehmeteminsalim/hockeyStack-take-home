const express = require("express");
const router = express.Router();

const loginGetController = require("../controllers/auth/login-get");
const loginPostController = require("../controllers/auth/login-post");
const registerGetController = require("../controllers/auth/register-get");
const registerPostController = require("../controllers/auth/register-post");
const logoutGetController = require("../controllers/auth/logout-get");

// GET
router.get("/login", loginGetController);

// POST request for login.
router.post("/login", loginPostController);

// GET request for register.
router.get("/register", registerGetController);

// POST request for creating User.
router.post("/register", registerPostController);

// GET request to logout.
router.get("/logout", logoutGetController);

module.exports = router;
