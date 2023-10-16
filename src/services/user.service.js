require("module-alias/register");
const bcrypt = require("bcrypt");
const { User } = require("@models/");

const sign_up = async (body) => {
   const find_user = await User.findOne({where: {user_name: body.username}});
   return find_user;
};

const generate_password = (password) => {
  const salt = 10;
  const result = bcrypt.hash(password, salt, null);
  return result;
};

module.exports = { sign_up };
