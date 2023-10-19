require("module-alias/register");
const express = require("express");
const router = express.Router();
const user_controller = require("@controllers/user.controller");
const {
  validate_sign_up,
  validate_sign_in,
  validate_edit_password,
} = require("@validations/user.validation");
const { response_create_or_update } = require("@common/response");
const { authentication, authorization } = require("@middleware/");

router
  .post(
    "/sign-up",
    validate_sign_up,
    response_create_or_update(user_controller.sign_up)
  )
  .post(
    "/sign-in",
    validate_sign_in,
    response_create_or_update(user_controller.sign_in)
  )
  .put(
    "/sign-out",
    authentication,
    response_create_or_update(user_controller.sign_out)
  )
  .put(
    "/edit-password",
    authentication,
    validate_edit_password,
    response_create_or_update(user_controller.edit_password)
  );

module.exports = router;
