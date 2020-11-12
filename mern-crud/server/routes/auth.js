const express = require("express");

const router = express.Router();

// import controller methods
const { login } = require("../controllers/auth");

// route
router.post("/login", function (req, res) {
  login;
});

module.exports = router;
