require("module-alias/register");
const Joi = require("joi");
const { API_CODE } = require("@helpers/handle-validate");

const validate_comment = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
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

module.exports = { validate_comment };
