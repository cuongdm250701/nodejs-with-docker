require("module-alias/register");
const express = require("express");
const router = express.Router();
const { response_create_or_update, response_get } = require("@common/response");
const { authentication, paging } = require("@middleware/");
const {
  validate_follow,
  validate_follow_receive,
} = require("@validations/follow.validation");
const follows_controller = require("@controllers/follow.controller");

router
  .post(
    "/",
    authentication,
    validate_follow,
    response_create_or_update(follows_controller.create)
  )
  .put(
    "/receive-notify/:follow_id",
    authentication,
    validate_follow_receive,
    response_create_or_update(follows_controller.receive_notify)
  )
  .get("/list", authentication, paging, response_get(follows_controller.list));

module.exports = router;
