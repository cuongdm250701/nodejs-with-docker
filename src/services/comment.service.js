require("module-alias/register");
const { Comment } = require("@models/");
const { REST_FULL_API_CODE, ROLE } = require("@helpers/constants");

const create = async (params) => {
  const { content, post_id, current_user } = params;
  const comment = await Comment.create({
    content,
    user_id: current_user.id,
    post_id: post_id,
  });
  return comment;
};

const update = async (params) => {
  const { content, post_id, current_user, comment_id } = params;
  const check_comment = await Comment.findOne({
    where: {
      id: comment_id,
      user_id: current_user.id,
      post_id: post_id,
    },
  });
  if (!check_comment) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  await Comment.update({ content: content }, { where: { id: comment_id } });
  const comment = await Comment.findOne({ where: { id: comment_id } });
  return comment;
};

const destroy = async (params) => {
  const { current_user, post_id, comment_id } = params;
  const check_comment = await Comment.findOne({
    where: {
      id: comment_id,
      user_id: current_user.id,
      post_id: post_id,
    },
  });
  if (!check_comment) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  if (
    current_user.role === ROLE.ADMIN ||
    check_comment.user_id === current_user.id
  ) {
    await Comment.destroy({ where: { id: comment_id } });
  }
  return true;
};

const list = async ({}) => {
  const comments = await Comment.findAll();
  return comments;
};

module.exports = {
  create,
  update,
  destroy,
  list,
};
