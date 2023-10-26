require("module-alias/register");
const services = require("@services/post-favorites.service");

const create = async (req, res) => {
  const { post_id } = req.params;
  const current_user = req.current_user;
  return services.create({ post_id, current_user });
};

const unfavorites = async (req, res) => {
  const { post_favorites_id } = req.params;
  const current_user = req.current_user;
  return services.unfavorites({ post_favorites_id, current_user });
};

const list = async (req, res) => {
  const { title, content, limit, offset, page } = req.query;
  const current_user = req.current_user;
  return services.list({ title, content, limit, offset, page, current_user });
};
module.exports = {
  create,
  unfavorites,
  list,
};
