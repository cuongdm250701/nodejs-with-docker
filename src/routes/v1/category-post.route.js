require("module-alias/register");
const express = require("express");
const router = express.Router();
const { ROLE } = require("@helpers/constants");
const category_posts_controller = require("@controllers/category-post.controller");
const { response_create_or_update } = require("@common/response");
const { authentication, authorization } = require("@middleware/");
const {
  validate_create_category,
} = require("@validations/category-post.validation");

router.post(
  "/",
  authentication,
  authorization([ROLE.ADMIN]),
  validate_create_category,
  response_create_or_update(category_posts_controller.create)
);

module.exports = router;
