require("module-alias/register");
const { Notifycation, Sequelize } = require("@models/");
const { REST_FULL_API_CODE } = require("@helpers/constants");
const { Op } = Sequelize;

const list = async (params) => {
  const { title, content, offset, limit, current_user, page } = params;
  const { count, rows } = await Notifycation.findAndCountAll({
    where: {
      title: { [Op.substring]: title || "" },
      content: { [Op.substring]: content || "" },
      receiver_id: current_user.id,
    },
    limit,
    offset,
  });

  return {
    data: rows,
    meta_data: {
      page: page,
      total: count,
      limit: limit,
    },
  };
};

const detail = async (params) => {
  const { notifycation_id, current_user, is_read } = params;
  const notifycation = await Notifycation.findOne({
    where: { id: notifycation_id, receiver_id: current_user.id },
  });
  if (!notifycation) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  return notifycation;
};

const change_status_read = async (params) => {
  const { notifycation_ids, is_read, current_user } = params;
  const notifycations = await Notifycation.findAll({
    where: {
      id: { [Op.in]: notifycation_ids },
      receiver_id: current_user.id,
    },
  });
  if (!notifycations.length) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  await Notifycation.update(
    { is_read: is_read },
    { where: { receiver_id: current_user.id } }
  );
  return true;
};

const destroy = async (params) => {
  const { notifycation_id, current_user } = params;
  const notifycation = await Notifycation.findOne({
    where: { id: notifycation_id, receiver_id: current_user.id },
  });
  if (!notifycation) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  await Notifycation.destroy({ where: { id: notifycation_id } });
  return true;
};

module.exports = {
  list,
  detail,
  change_status_read,
  destroy,
};
