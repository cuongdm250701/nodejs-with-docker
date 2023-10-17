require("module-alias/register");
const { verify_token } = require("@config/auth");
const { User } = require("@models/");

const authentication = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      res.json({
        code: 400,
        message: "User is not login",
      });
      return;
    }
    const access_token = authorization.split(" ")[1];
    const payload = verify_token(access_token);
    const user_id = payload.user_id;
    const current_user = await User.findOne({ where: { id: user_id } });
    if (current_user && !current_user.is_login) {
      res.json({
        code: 400,
        message: "User is not login",
      });
      return;
    }
    req.current_user = current_user;
    next();
  } catch (error) {
    res.json({
      code: 400,
      message: error.message,
    });
  }
};

module.exports = { authentication };
