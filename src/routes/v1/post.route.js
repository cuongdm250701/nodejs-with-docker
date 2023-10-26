require("module-alias/register");
const express = require("express");
const router = express.Router();
const posts_controller = require("@controllers/post.controller");
const post_favorites_controller = require("@controllers/post-favorites.controller");
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
    "/post-favorites/:post_favorites_id",
    authentication,
    response_create_or_update(post_favorites_controller.unfavorites)
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
  )
  .post(
    "/:post_id/post-favorites",
    authentication,
    response_create_or_update(post_favorites_controller.create)
  )
  .get(
    "/post-favorites/list",
    authentication,
    paging,
    response_get(post_favorites_controller.list)
  );

module.exports = router;
