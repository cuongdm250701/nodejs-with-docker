require("module-alias/register");
const services = require("@services/post.service");

const create = async (req, res) => {
  const { title, content } = req.body;
  const { category_id } = req.params;
  const current_user = req.current_user;
  return services.create({ title, content, category_id, current_user });
};

const update = async (req, res) => {
  const { title, content } = req.body;
  const { category_id, post_id } = req.params;
  const current_user = req.current_user;
  return services.update({
    title,
    content,
    category_id,
    post_id,
    current_user,
  });
};

const destroy = async (req, res) => {
  const { category_id, post_id } = req.params;
  const current_user = req.current_user;
  return services.destroy({ category_id, post_id, current_user });
};

const list = async (req, res) => {
  const { category_id } = req.params;
  return services.list({ category_id });
};

const my_posts = async (req, res) => {
  const current_user = req.current_user;
  return services.my_posts({ current_user });
};

module.exports = {
  create,
  update,
  destroy,
  list,
  my_posts,
};
