require("module-alias/register");
const express = require("express");
const router = express.Router();
const { authentication, paging } = require("@middleware/");
const {
  response_create_or_update,
  response_get,
  response_delete,
} = require("@common/response");
const {
  validate_notifycation,
} = require("@validations/notifycation.validation");
const notifycation_controller = require("@controllers/notifycation.controller");

router
  .get("/", authentication, paging, response_get(notifycation_controller.list))
  .get(
    "/:notifycation_id",
    authentication,
    response_get(notifycation_controller.detail)
  )
  .put(
    "/",
    authentication,
    validate_notifycation,
    response_create_or_update(notifycation_controller.change_status_read)
  )
  .delete(
    "/:notifycation_id",
    authentication,
    response_delete(notifycation_controller.destroy)
  );

module.exports = router;
