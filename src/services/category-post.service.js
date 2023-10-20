require("module-alias/register");
const { CategoryPost, Sequelize } = require("@models/");
const { REST_FULL_API_CODE } = require("@helpers/constants");
const { Op } = Sequelize;

const create = async (body) => {
  const { title } = body;
  const category_exists = await CategoryPost.findOne({
    where: { title: title },
  });
  if (category_exists) {
    return REST_FULL_API_CODE.CREATE_FAIL;
  }
  const category = await CategoryPost.create({ title: title });
  return category;
};

const update = async (params) => {
  const { title, category_id } = params;
  const found_category_id = await CategoryPost.findOne({
    where: { id: category_id },
  });
  if (!found_category_id) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  if (title === found_category_id.title) {
    return REST_FULL_API_CODE.UPDATE_FAIL;
  }
  await CategoryPost.update({ title: title }, { where: { id: category_id } });
  const category = await CategoryPost.findOne({
    where: { id: category_id },
  });
  return category;
};

const list = async (params) => {
  const categories = await CategoryPost.findAll();
  return categories;
};

const destroy = async (params) => {
  const { category_id } = params;
  const found_category_id = await CategoryPost.findOne({
    where: { id: category_id },
  });
  if (!found_category_id) {
    return REST_FULL_API_CODE.NOT_EXISTS;
  }
  await CategoryPost.destroy({ where: { id: category_id } });
  return true;
};

module.exports = { create, update, list, destroy };
