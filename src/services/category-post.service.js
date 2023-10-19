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

module.exports = { create };
