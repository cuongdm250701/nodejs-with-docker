require("module-alias/register");
const Joi = require("joi");
const { REGEX_EMAIL } = require("@helpers/constants");
const { API_CODE } = require("@helpers/handle-validate");

const validate_sign_up = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
        username: Joi.string()
          .required()
          .trim()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("username")),
        email: Joi.string()
          .required()
          .trim()
          .regex(REGEX_EMAIL)
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("email")),
        password: Joi.string()
          .required()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("password")),
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

const validate_sign_in = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      username: Joi.string()
        .required()
        .trim()
        .error(API_CODE.INVALID_PARAMS.error_invalid_params("username")),
      password: Joi.string()
        .required()
        .error(API_CODE.INVALID_PARAMS.error_invalid_params("password")),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.json({
      message: error.message,
      code: error.code,
    });
  }
};

const validate_edit_password = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
        current_password: Joi.string()
          .required()
          .error(
            API_CODE.INVALID_PARAMS.error_invalid_params("current_password")
          ),
        new_password: Joi.string()
          .required()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("new_password")),
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

module.exports = { validate_sign_up, validate_sign_in, validate_edit_password };
