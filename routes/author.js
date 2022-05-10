const express = require("express");
const router = express.Router();

const author_controller = require("../controllers/authorController");
const createGetController = require("../controllers/authors/create-get");
const createPostController = require("../controllers/authors/create-post");
const deleteGetController = require("../controllers/authors/delete-get");
const deletePostController = require("../controllers/authors/delete-post");
const detailGetController = require("../controllers/authors/detail-get");
const listController = require("../controllers/authors/list");
const updateGetController = require("../controllers/authors/update-get");
const updatePostController = require("../controllers/authors/update-post");

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/create", createGetController);

// POST request for creating Author.
router.post("/create", createPostController);

// GET request to delete Author.
router.get("/:id/delete", deleteGetController);

// POST request to delete Author
router.post("/:id/delete", deletePostController);

// GET request to update Author.
router.get("/:id/update", updateGetController);

// POST request to update Author.
router.post("/:id/update", updatePostController);

// GET request for one Author.
router.get("/:id", detailGetController);

// GET request for list of all Authors.
router.get("/", listController);

module.exports = router;
