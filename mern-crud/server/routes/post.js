const express = require("express");

const router = express.Router();

// import controller methods
const { create } = require("../controllers/post");

// route
router.post("/post", create);

module.exports = router;
