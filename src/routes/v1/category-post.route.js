require("module-alias/register");
const express = require("express");
const router = express.Router();
const { ROLE } = require("@helpers/constants");
const category_posts_controller = require("@controllers/category-post.controller");
const {
  response_create_or_update,
  response_get,
  response_delete,
} = require("@common/response");
const { authentication, authorization } = require("@middleware/");
const {
  validate_create_category,
} = require("@validations/category-post.validation");

router
  .post(
    "/",
    authentication,
    authorization([ROLE.ADMIN]),
    validate_create_category,
    response_create_or_update(category_posts_controller.create)
  )
  .put(
    "/:category_id",
    authentication,
    authorization([ROLE.ADMIN]),
    validate_create_category,
    response_create_or_update(category_posts_controller.update)
  )
  .get(
    "/",
    authentication,
    authorization([ROLE.ADMIN]),
    response_get(category_posts_controller.list)
  )
  .delete(
    "/:category_id",
    authentication,
    authorization([ROLE.ADMIN]),
    response_delete(category_posts_controller.destroy)
  );

module.exports = router;
