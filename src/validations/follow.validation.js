require("module-alias/register");
const Joi = require("joi");
const { API_CODE } = require("@helpers/handle-validate");

const validate_follow = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
        user_id: Joi.number()
          .required()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("user_id")),
        is_follow: Joi.boolean()
          .required()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("is_follow")),
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

const validate_follow_receive = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
        is_receive: Joi.boolean()
          .required()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("is_receive")),
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

module.exports = { validate_follow, validate_follow_receive };
