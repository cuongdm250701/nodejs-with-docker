require("module-alias/register");
const services = require("@services/user.service");

const sign_in = async (req, res) => {
  return services.sign_in(req.body);
};

const sign_up = async (req, res) => {
  return services.sign_up(req.body);
};

const sign_out = async (req, res) => {
  const current_user = req.current_user;
  return services.sign_out(current_user);
};

const edit_password = async (req, res) => {
  const current_user = req.current_user;
  const { current_password, new_password } = req.body;
  return services.edit_password({
    current_user,
    current_password,
    new_password,
  });
};

module.exports = { sign_in, sign_up, sign_out, edit_password };
