require("module-alias/register");
const express = require("express");
const router = express.Router();
const user_controller = require("@controllers/user.controller.js");

router.post("/sign-up", user_controller.sign_up); // handle response with json
router.post("/login", user_controller.login);

module.exports = router;
