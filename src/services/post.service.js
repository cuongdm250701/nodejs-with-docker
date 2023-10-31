require("module-alias/register");
const {
  Post,
  CategoryPost,
  Follow,
  Notifycation,
  Sequelize,
} = require("@models/");
const {
  REST_FULL_API_CODE,
  STATUS_APPROVAL_POST,
  MESSAGE,
} = require("@helpers/constants");
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
  // create notifycation
  const followers = await Follow.findAll({
    where: { followed_id: current_user.id, is_receive: true },
  });
  const notifycations = followers.map((item) => {
    return {
      title: post.title,
      content: post.content,
      created_by_id: current_user.id,
      receiver_id: item.follow_by_id,
    };
  });
  await Notifycation.bulkCreate(notifycations);
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
  const { category_id, limit, offset, page, title, content } = params;
  const category = await CategoryPost.findOne({ where: { id: category_id } });
  if (!category) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  const { count, rows } = await Post.findAndCountAll({
    where: {
      category_id: category_id,
      title: {
        [Op.substring]: title || "",
      },
      content: {
        [Op.substring]: content || "",
      },
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

const my_posts = async (params) => {
  const { current_user, limit, offset, page, title, content } = params;
  const { count, rows } = await Post.findAndCountAll({
    where: {
      user_id: current_user.id,
      title: {
        [Op.substring]: title,
      },
      content: {
        [Op.substring]: content,
      },
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

const approved_posts = async (params) => {
  const { post_id, reason, status } = params;
  const found_post = await Post.findOne({ where: { id: post_id } });
  if (!found_post) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  if (status === STATUS_APPROVAL_POST.REJECT && !reason) {
    return MESSAGE.REQUIRE_REASON;
  }
  await Post.update(
    {
      reason: status !== STATUS_APPROVAL_POST.REJECT ? null : reason,
      status: status,
    },
    { where: { id: post_id } }
  );
  return true;
};

module.exports = {
  create,
  update,
  destroy,
  list,
  my_posts,
  approved_posts,
};
