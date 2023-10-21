const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require(`${__dirname}/../config/env.js`);

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    token_expires: {
      type: DataTypes.DATE,
      allowNull: true,
      // new Date(new Date().getTime() + 5 * 60000)
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "Token",
    freezeTableName: true, // Enforcing the table name to be equal to the model name
    timestamps: false,
  }
);

Token.associations = () => {};

module.exports = () => Token;
