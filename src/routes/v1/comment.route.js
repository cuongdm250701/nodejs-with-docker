require("module-alias/register");
const express = require("express");
const router = express.Router();
const {
  response_create_or_update,
  response_get,
  response_delete,
} = require("@common/response");
const comments_controller = require("@controllers/comment.controller");
const { authentication } = require("@middleware/");
const { validate_comment } = require("@validations/comment.validation");

router
  .post(
    "/:post_id",
    authentication,
    validate_comment,
    response_create_or_update(comments_controller.create)
  )
  .put(
    "/:post_id/:comment_id",
    authentication,
    validate_comment,
    response_create_or_update(comments_controller.update)
  )
  .delete(
    "/:post_id/:comment_id",
    authentication,
    response_delete(comments_controller.destroy)
  )
  .get("/:post_id", authentication, response_get(comments_controller.list));

module.exports = router;
