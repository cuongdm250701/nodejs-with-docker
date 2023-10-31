require("module-alias/register");
const Joi = require("joi");
const { API_CODE } = require("@helpers/handle-validate");

const validate_notifycation = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
        notifycation_ids: Joi.array()
          .required()
          .error(
            API_CODE.INVALID_PARAMS.error_invalid_params("notifycation_ids")
          ),
        is_read: Joi.boolean()
          .required()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("is_read")),
      })
      .unknown(true);
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.json({
      message: error.message,
      code: error.code,
    });
  }
};

module.exports = { validate_notifycation };
