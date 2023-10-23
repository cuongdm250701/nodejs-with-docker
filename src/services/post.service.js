require("module-alias/register");
const { Post, CategoryPost, Sequelize } = require("@models/");
const { REST_FULL_API_CODE } = require("@helpers/constants");
const { Op } = Sequelize;

const create = async (params) => {
  const { title, content, category_id, current_user } = params;
  const check_category = await CategoryPost.findOne({
    where: { id: category_id },
  });
  if (!check_category) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  const post = await Post.create({
    title: title,
    content: content,
    user_id: current_user.id,
    category_id: category_id,
  });
  return post;
};

const update = async (params) => {
  const { title, content, category_id, post_id, current_user } = params;
  const found_post = await Post.findOne({
    where: {
      id: post_id,
      category_id: category_id,
      user_id: current_user.id,
    },
  });
  if (!found_post) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  await Post.update(
    {
      title: title,
      content: content,
    },
    { where: { id: post_id } }
  );
  const post = await Post.findOne({ where: { id: post_id } });
  return post;
};

const destroy = async (params) => {
  const { category_id, post_id, current_user } = params;
  const found_post = await Post.findOne({
    where: { id: post_id, category_id: category_id, user_id: current_user.id },
  });
  if (!found_post) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  await Post.destroy({ where: { id: post_id } });
  return true;
};

const list = async (params) => {
  const { category_id } = params;
  const category = await CategoryPost.findOne({ where: { id: category_id } });
  if (!category) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  const posts = await Post.findAll({ where: { category_id: category_id } });
  return posts;
};

const my_posts = async (params) => {
  const { current_user } = params;
  const posts = await Post.findAll({ where: { user_id: current_user.id } });
  return posts;
};

module.exports = {
  create,
  update,
  destroy,
  list,
  my_posts,
};
