require("module-alias/register");
const express = require("express");
const router = express.Router();
const posts_controller = require("@controllers/post.controller");
const { ROLE } = require("@helpers/constants");
const {
  response_create_or_update,
  response_get,
  response_delete,
} = require("@common/response");
const {
  validate_post,
  validate_approved_post,
} = require("@validations/post.validation");
const { authentication, authorization, paging } = require("@middleware/");

router
  .post(
    "/:category_id",
    validate_post,
    authentication,
    response_create_or_update(posts_controller.create)
  )
  .put(
    "/:category_id/:post_id",
    validate_post,
    authentication,
    response_create_or_update(posts_controller.update)
  )
  .delete(
    "/:category_id/:post_id",
    authentication,
    response_delete(posts_controller.destroy)
  )
  .get(
    "/:category_id",
    authentication,
    authorization([ROLE.ADMIN]),
    paging,
    response_get(posts_controller.list)
  )
  .get(
    "/my-posts/list",
    authentication,
    paging,
    response_get(posts_controller.my_posts)
  )
  .put(
    "/:post_id",
    authentication,
    authorization([ROLE.ADMIN]),
    validate_approved_post,
    response_create_or_update(posts_controller.approved_posts)
  );

module.exports = router;
