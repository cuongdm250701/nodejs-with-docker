require("module-alias/register");
const { authentication } = require("@middleware/authentication");
const { authorization } = require("@middleware/authorization");
const { paging } = require("@middleware/paging");

module.exports = {
  authentication,
  authorization,
  paging,
};
