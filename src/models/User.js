const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require(`${__dirname}/../config/env.js`);

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    is_login: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "User",
    freezeTableName: true, // Enforcing the table name to be equal to the model name
  }
);

// Associate
User.associations = (db) => {
  db.User.hasMany(db.Post, {
    foreignKey: {
      name: "user_id",
    },
  });

  db.User.hasMany(db.Comment, {
    foreignKey: {
      name: "user_id",
    },
  });

  db.User.hasMany(db.PostFavorite, {
    foreignKey: {
      name: "user_id",
    },
  });

  db.User.hasMany(db.Follow, {
    foreignKey: {
      name: "followed_id",
    },
  });

  db.User.hasMany(db.Follow, {
    foreignKey: {
      name: "follow_by_id",
    },
  });

  db.User.hasMany(db.Notifycation, {
    foreignKey: {
      name: "created_by_id",
    },
  });

  db.User.hasMany(db.Notifycation, {
    foreignKey: {
      name: "receiver_id",
    },
  });
};

module.exports = () => User;
