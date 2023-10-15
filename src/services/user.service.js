require("module-alias/register");
const bcrypt = require("bcrypt");
const { validate_sign_up } = require("@validations/user.validation");

const sign_up = async (body) => {
  // validate
  const schema = validate_sign_up();
  const { username, email, password } = await schema.validateAsync(body);
  return body;
};

const generate_password = (password) => {
  const salt = 10;
  const result = bcrypt.hash(password, salt, null);
  return result;
};

module.exports = { sign_up };
