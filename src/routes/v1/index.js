require("module-alias/register");
const express = require("express");
const router = express.Router();

// index router version 1
router.get("/", (req, res, next) => {
  res.json({ message: "Welcome to api v1" });
});

router.use("/user", require("@routes/v1/user.route.js"));

module.exports = router;
