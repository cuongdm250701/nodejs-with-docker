const { DataTypes, Model } = require("sequelize");
const sequelize = require(`${__dirname}/../config/env.js`);

class Notifycation extends Model {}

Notifycation.init(
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
    created_by_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "Notifycation",
    freezeTableName: true, // Enforcing the table name to be equal to the model name
  }
);

// Associate

Notifycation.associations = (db) => {
  db.Notifycation.belongsTo(db.User, {
    foreignKey: {
      name: "created_by_id",
    },
  });

  db.Notifycation.belongsTo(db.User, {
    foreignKey: {
      name: "receiver_id",
    },
  });
};

module.exports = () => Notifycation;
