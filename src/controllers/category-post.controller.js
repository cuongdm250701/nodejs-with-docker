require("module-alias/register");
const services = require("@services/category-post.service");

const create = async (req, res) => {
  return services.create(req.body);
};

const update = async (req, res) => {
  const { title } = req.body;
  const { category_id } = req.params;
  return services.update({ title, category_id });
};

const list = async (req, res) => {
  return services.list({});
};

const destroy = async (req, res) => {
  const { category_id } = req.params;
  return services.destroy({ category_id });
};

module.exports = { create, update, list, destroy };
