require("module-alias/register");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { REST_FULL_API_CODE, ADD_MINUTES } = require("@helpers/constants");
const { User, Token, Sequelize } = require("@models/");
const send_mail = require("@helpers/mailer");
const { generate_token } = require("@config/auth");

const { Op } = Sequelize;

/** SIGN UP */

const sign_up = async (body) => {
  const { username, email, password } = body;
  const check_user_exists = await User.findOne({
    where: {
      [Op.or]: [{ user_name: username }, { email: email }],
    },
  });
  if (check_user_exists) {
    return REST_FULL_API_CODE.CREATE_FAIL;
  }
  const password_hash = generate_password(password);
  const user = await User.create({
    user_name: username,
    email: email,
    password: password_hash,
  });
  return user;
};

/** SIGN IN */

const sign_in = async (body) => {
  const { username, password } = body;
  const user = await User.findOne({
    where: {
      [Op.or]: [{ user_name: username }, { email: username }],
    },
  });
  if (!user) {
    return REST_FULL_API_CODE.NOT_FOUND;
  }
  const check_pass = compare_password(password, user.password);
  if (!check_pass) {
    return REST_FULL_API_CODE.PASSWORD_INVALID;
  }
  const access_token = generate_token({ user_id: user.id });
  await User.update({ is_login: true }, { where: { id: user.id } });
  return {
    user: {
      id: user.id,
      username: user.user_name,
      email: user.email,
      role: user.role,
    },
    access_token,
  };
};

/** SIGN OUT */

const sign_out = async (current_user) => {
  await User.update({ is_login: false }, { where: { id: current_user.id } });
};

/** EDIT PASSWORD */

const edit_password = async (params) => {
  const { current_password, new_password, current_user } = params;
  const check_pass = compare_password(current_password, current_user.password);
  if (!check_pass) {
    return REST_FULL_API_CODE.PASSWORD_INVALID;
  }
  const update_pass = generate_password(new_password);
  await User.update(
    { password: update_pass },
    { where: { id: current_user.id } }
  );
  return true;
};

/** FORGOT PASSWORD */

const forgot_password = async (params) => {
  const { email } = params;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return REST_FULL_API_CODE.NOT_FOUND;
  }
  let token = await Token.findOne({ where: { user_id: user.id } });
  if (!token) {
    token = await Token.create({
      user_id: user.id,
      token: crypto.randomBytes(10).toString("hex"),
      token_expires: ADD_MINUTES,
    });
  }
  const link = `${process.env.BASE_URL}/password-reset/${user.id}/${token.token}`;
  await send_mail(user.email, "Password reset", link);
  return "LINK SENT TO EMAIL";
};

/** RESET PASSWORD */

const reset_password = async (params) => {
  const { user_id, token, new_password } = params;
  const user = await User.findOne({ where: { id: user_id } });
  if (!user) {
    return REST_FULL_API_CODE.NOT_FOUND;
  }
  const check_token = await Token.findOne({
    where: { user_id: user_id, token: token },
  });
  if (!check_token) {
    return REST_FULL_API_CODE.INVALID_TOKEN_OR_EXPIRES;
  }
  const check_time =
    new Date(check_token.token_expires).getTime() > new Date().getTime();
  if (!check_time) {
    return REST_FULL_API_CODE.INVALID_TOKEN_OR_EXPIRES;
  }
  const password_hash = generate_password(new_password);
  await User.update({ password: password_hash }, { where: { id: user_id } });
  await Token.destroy({ where: { id: check_token.id } });
  return true;
};

/** ===================================== */
const generate_password = (password) => {
  const salt = 10;
  const result = bcrypt.hashSync(password, salt, null);
  return result;
};

const compare_password = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  sign_up,
  sign_in,
  sign_out,
  edit_password,
  forgot_password,
  reset_password,
};
