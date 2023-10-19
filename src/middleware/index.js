require("module-alias/register");
const { authentication } = require("@middleware/authentication");
const { authorization } = require("@middleware/authorization");

module.exports = {
  authentication,
  authorization,
};
