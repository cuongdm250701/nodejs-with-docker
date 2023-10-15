const { DataTypes, Model } = require("sequelize");
const sequelize = require(`${__dirname}/../config/env.js`);

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "Comment",
    freezeTableName: true, // Enforcing the table name to be equal to the model name
  }
);

// Associate

Comment.associations = (db) => {
  db.Comment.belongsTo(db.Post, {
    foreignKey: {
      name: "post_id",
    },
  });

  db.Comment.belongsTo(db.User, {
    foreignKey: {
      name: "user_id",
    },
  });
};

module.exports = () => Comment;
