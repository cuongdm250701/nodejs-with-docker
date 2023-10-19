require("module-alias/register");
const express = require("express");
const router = express.Router();

// index router version 1
router.get("/", (req, res, next) => {
  res.json({ message: "Welcome to api v1" });
});

router.use("/users", require("@routes/v1/user.route"));
router.use("/category-posts", require("@routes/v1/category-post.route"));

module.exports = router;
