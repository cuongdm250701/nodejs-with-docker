const { DataTypes, Model } = require("sequelize");
const sequelize = require(`${__dirname}/../config/env.js`);

class PostFavorite extends Model {}

PostFavorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "PostFavorite",
    freezeTableName: true, // Enforcing the table
  }
);

// Association

PostFavorite.associations = (db) => {
  db.PostFavorite.belongsTo(db.User, {
    foreignKey: {
      name: "user_id",
    },
  });

  db.PostFavorite.belongsTo(db.Post, {
    foreignKey: {
      name: "post_id",
    },
  });
};

module.exports = () => PostFavorite;
