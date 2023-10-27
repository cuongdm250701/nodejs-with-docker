const { DataTypes, Model } = require("sequelize");
const sequelize = require(`${__dirname}/../config/env.js`);

class Follow extends Model {}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    followed_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    follow_by_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_receive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "Follow",
    freezeTableName: true, // Enforcing the table name to be equal to the model name
  }
);

// Associate

Follow.associations = (db) => {
  db.Follow.belongsTo(db.User, {
    foreignKey: {
      name: "followed_id",
    },
  });

  db.Follow.belongsTo(db.User, {
    foreignKey: {
      name: "follow_by_id",
    },
  });
};
module.exports = () => Follow;
