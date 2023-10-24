const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require(`${__dirname}/../config/env.js`);

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    reason: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "Post",
    freezeTableName: true, // Enforcing the table name to be equal to the model name
  }
);

// Associate

Post.associations = (db) => {
  db.Post.belongsTo(db.User, {
    foreignKey: {
      name: "user_id",
    },
  });

  db.Post.belongsTo(db.CategoryPost, {
    foreignKey: {
      name: "category_id",
    },
  });
};

module.exports = () => Post;
