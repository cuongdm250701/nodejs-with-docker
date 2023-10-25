require("module-alias/register");
const services = require("@services/comment.service");

const create = async (req, res) => {
  const { content } = req.body;
  const { post_id } = req.params;
  const current_user = req.current_user;
  return services.create({ content, post_id, current_user });
};

const update = async (req, res) => {
  const { content } = req.body;
  const { post_id, comment_id } = req.params;
  const current_user = req.current_user;
  return services.update({ content, post_id, current_user, comment_id });
};

const destroy = async (req, res) => {
  const { post_id, comment_id } = req.params;
  const current_user = req.current_user;
  return services.destroy({ current_user, post_id, comment_id });
};

const list = async (req, res) => {
  return services.list({});
};

module.exports = {
  create,
  update,
  destroy,
  list,
};
