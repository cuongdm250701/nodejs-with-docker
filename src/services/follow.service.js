require("module-alias/register");
const { User, Follow, Sequelize } = require("@models/");
const { REST_FULL_API_CODE, ACTIVE } = require("@helpers/constants");
const { Op } = Sequelize;

const create = async (params) => {
  const { user_id, current_user, is_follow } = params;
  const user = await User.findOne({
    where: { id: user_id, is_active: ACTIVE.IS_ACTIVE },
  });
  if (!user) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  const follow = await Follow.findOne({
    where: { followed_id: user_id, follow_by_id: current_user.id },
  });
  if (follow && is_follow) {
    return REST_FULL_API_CODE.CREATE_FAIL;
  }
  if (user_id !== current_user && is_follow) {
    await Follow.create({
      followed_id: user_id,
      follow_by_id: current_user.id,
    });
  } else if (user_id !== current_user && !is_follow) {
    await Follow.destroy({
      where: { followed_id: user_id, follow_by_id: current_user.id },
    });
  }
  return true;
};

const receive_notify = async (params) => {
  const { follow_id, is_receive, current_user } = params;
  const follow = await Follow.findOne({
    where: { id: follow_id, follow_by_id: current_user.id },
  });
  if (!follow) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  await Follow.update({ is_receive: is_receive }, { where: { id: follow_id } });
  return true;
};

const list = async (params) => {
  const { page, limit, offset, username, current_user, email } = params;
  const { rows, count } = await Follow.findAndCountAll({
    where: { followed_id: current_user.id },
    include: [
      {
        model: User,
        required: false,
        attributes: ["user_name", "email"],
        where: {
          user_name: {
            [Op.substring]: username || "",
          },
          email: {
            [Op.substring]: email || "",
          },
        },
      },
    ],
    raw: true,
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
module.exports = {
  create,
  receive_notify,
  list,
};
