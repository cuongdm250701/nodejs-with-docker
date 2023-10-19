require("module-alias/register");
const services = require("@services/category-post.service");

const create = async (req, res) => {
  return services.create(req.body);
};

module.exports = { create };
