require("module-alias/register");
const services = require("@services/notifycation.service");

const list = async (req, res) => {
  const { title, content, offset, limit, page } = req.query;
  const current_user = req.current_user;
  return services.list({ title, content, offset, limit, current_user, page });
};

const detail = async (req, res) => {
  const { notifycation_id } = req.params;
  const current_user = req.current_user;
  return services.detail({ notifycation_id, current_user });
};

const change_status_read = async (req, res) => {
  const { notifycation_ids, is_read } = req.body;
  const current_user = req.current_user;
  return services.change_status_read({
    notifycation_ids,
    is_read,
    current_user,
  });
};

const destroy = async (req, res) => {
  const { notifycation_id } = req.params;
  const current_user = req.current_user;
  return services.destroy({ notifycation_id, current_user });
};

module.exports = {
  list,
  detail,
  change_status_read,
  destroy,
};
