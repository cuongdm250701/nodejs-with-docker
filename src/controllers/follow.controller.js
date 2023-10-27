require("module-alias/register");
const services = require("@services/follow.service");

const create = async (req, res) => {
  const { user_id, is_follow } = req.body;
  const current_user = req.current_user;
  return services.create({ user_id, current_user, is_follow });
};

const receive_notify = async (req, res) => {
  const { follow_id } = req.params;
  const { is_receive } = req.body;
  const current_user = req.current_user;
  return services.receive_notify({ follow_id, is_receive, current_user });
};

const list = async (req, res) => {
  const { page, limit, offset, username, email } = req.query;
  const current_user = req.current_user;
  return services.list({ page, limit, offset, username, current_user, email });
};

module.exports = {
  create,
  receive_notify,
  list,
};
