const express = require("express");

const router = express.Router();

// import controller methods
const { create, list, read, update, remove } = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");

// route
router.post("/post", requireSignin, create);
router.get("/posts", list);
router.get("/post/:slug", read); //req.params.slug
router.put("/post/:slug", requireSignin, update);
router.delete("/post/:slug", requireSignin, remove); // We used the word remove instead of delete because delete is a reserved keyword in javascript.

// router.get("/secret", requireSignin, (req, res) => {
//   res.json({
//     data: req.user.name,
//   });
// });

module.exports = router;
