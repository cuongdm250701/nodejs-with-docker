require("module-alias/register");
const service = require("@services/user.service");

const login = async (req, res) => {
  const { username } = req.body;
  res.json({ message: username });
};

const sign_up = async (req, res) => {
  const data = service.sign_up(req.body);
  res.json({ data });
};

module.exports = { login, sign_up };
