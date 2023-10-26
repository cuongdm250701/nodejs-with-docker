require("module-alias/register");
const {
  STATUS_APPROVAL_POST,
  REST_FULL_API_CODE,
} = require("@helpers/constants");
const { Post, PostFavorite, Sequelize } = require("@models/");
const { Op } = Sequelize;

const create = async (params) => {
  const { post_id, current_user } = params;
  const post = await check_exists_post(post_id);
  if (!post) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  const post_favorite = await PostFavorite.create({
    post_id: post.id,
    user_id: current_user.id,
  });
  return post_favorite;
};

const unfavorites = async (params) => {
  const { post_favorites_id, current_user } = params;
  const post_favorites = await PostFavorite.findOne({
    where: { id: post_favorites_id, user_id: current_user.id },
  });
  console.log("post_favorites", post_favorites);
  if (!post_favorites) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  await PostFavorite.destroy({ where: { id: post_favorites_id } });
  return true;
};

const list = async (params) => {
  const { title, content, limit, offset, page, current_user } = params;
  const { rows, count } = await PostFavorite.findAndCountAll({
    where: {
      //     title: {
      //       [Op.substring]: title,
      //     },
      //     content: {
      //       [Op.substring]: content,
      //     },
      user_id: current_user.id,
    },
    include: [
      {
        model: Post,
        //   as: "Post",
        required: false,
        attributes: ["title", "content"],
        where: {
          title: {
            [Op.substring]: title || "",
          },
          content: {
            [Op.substring]: content || "",
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

const check_exists_post = async (post_id) => {
  const post = await Post.findOne({
    where: {
      id: post_id,
      status: STATUS_APPROVAL_POST.APPROVAL,
    },
  });
  return post;
};

module.exports = {
  create,
  unfavorites,
  list,
};
