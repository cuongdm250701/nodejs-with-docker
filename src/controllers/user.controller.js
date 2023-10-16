require("module-alias/register");
const services = require("@services/user.service");


const login = async (req, res) => {
  const { username } = req.body;
  res.json({ message: username });
};

const sign_up = async (req, res) => {
  return services.sign_up(req.body);
};

module.exports = { login, sign_up };
