require("module-alias/register");
const { REST_FULL_API_CODE } = require("@helpers/constants");

const authorization = (roles) => {
  return (req, res, next) => {
    const current_user = req.current_user;
    if (roles.length && !roles.includes(current_user.role)) {
      return res.json(REST_FULL_API_CODE.PERMISSION_DENIED);
    }
    next();
  };
};

module.exports = { authorization };
