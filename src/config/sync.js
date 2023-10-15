require("module-alias/register");

const models = require("@models");

models.sequelize
  .sync({ force: false, alert: false })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log("err", err);
    throw new Error(err);
  });
