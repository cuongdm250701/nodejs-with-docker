const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require(`${__dirname}/../config/env.js`);
class User extends Model {}

User.init({
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
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'User',
    freezeTableName: true // Enforcing the table name to be equal to the model name
});

module.exports = () => User;
