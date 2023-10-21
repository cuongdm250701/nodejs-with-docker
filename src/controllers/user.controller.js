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

const forgot_password = async (req, res) => {
  const { email } = req.body;
  return services.forgot_password({ email });
};

const reset_password = async (req, res) => {
  const { user_id, token } = req.params;
  const { new_password } = req.body;
  return services.reset_password({ user_id, token, new_password });
};

module.exports = {
  sign_in,
  sign_up,
  sign_out,
  edit_password,
  forgot_password,
  reset_password,
};
