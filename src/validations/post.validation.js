require("module-alias/register");
const Joi = require("joi");
const { API_CODE } = require("@helpers/handle-validate");

const validate_post = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
        title: Joi.string()
          .required()
          .trim()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("title")),
        content: Joi.string()
          .required()
          .trim()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("content")),
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

const validate_approved_post = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
        status: Joi.number()
          .required()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("status")),
        reason: Joi.string()
          .required()
          .trim()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("reason")),
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

module.exports = { validate_post, validate_approved_post };
