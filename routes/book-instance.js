const express = require("express");
const router = express.Router();

const createGetController = require("../controllers/bookInstances/create-get");
const createPostController = require("../controllers/bookInstances/create-post");
const deleteGetController = require("../controllers/bookInstances/delete-get");
const deletePostController = require("../controllers/bookInstances/delete-post");
const updateGetController = require("../controllers/bookInstances/update-get");
const updatePostController = require("../controllers/bookInstances/update-post");
const indexController = require("../controllers/bookInstances/index");
const listController = require("../controllers/bookInstances/list");

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get("/create", createGetController);

// POST request for creating BookInstance.
router.post("/create", createPostController);

// GET request to delete BookInstance.
router.get("/:id/delete", deleteGetController);

// POST request to delete BookInstance.
router.post("/:id/delete", deletePostController);

// GET request to update BookInstance.
router.get("/:id/update", updateGetController);

// POST request to update BookInstance.
router.post("/:id/update", updatePostController);

// GET request for one BookInstance.
router.get("/:id", indexController);

// GET request for list of all BookInstance.
router.get("/", listController);

module.exports = router;
