require("module-alias/register");
const express = require("express");
const router = express.Router();
const user_controller = require("@controllers/user.controller.js");
const { validate_sign_up } = require("@validations/user.validation");
const { response_create_or_update } = require("@common/response");

router.post("/sign-up", validate_sign_up, response_create_or_update(user_controller.sign_up));
router.post("/login", user_controller.login);

module.exports = router;
