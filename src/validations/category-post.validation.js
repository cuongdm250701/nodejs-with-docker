require("module-alias/register");
const Joi = require("joi");
const { API_CODE } = require("@helpers/handle-validate");

const validate_create_category = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
        title: Joi.string()
          .trim() // not working
          .required()
          .error(API_CODE.INVALID_PARAMS.error_invalid_params("title")),
      })
      .unknown(true);
    await schema.validateAsync(req.body);
    console.log(req.body);
    next();
  } catch (error) {
    res.json({
      message: error.message,
      code: error.code,
    });
  }
};

module.exports = { validate_create_category };
