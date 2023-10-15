require("module-alias/register");
const Joi = require("joi");
const { REGEX_EMAIL } = require("@helpers/constants");

const validate_sign_up = () => {
  const schema = Joi.object()
    .keys({
      username: Joi.string().required(), // hanlde error
      email: Joi.string().required().email().regex(REGEX_EMAIL),
      password: Joi.string().required(),
    })
    .unknown(true);
  return schema;
};

module.exports = { validate_sign_up };
