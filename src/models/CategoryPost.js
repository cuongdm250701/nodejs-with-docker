const { DataTypes, Model } = require('sequelize');
const sequelize = require(`${__dirname}/../config/env.js`);

class CategoryPost extends Model {}

CategoryPost.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'CategoryPost',
    freezeTableName: true // Enforcing the table name to be equal to the model name
})

// Associate

CategoryPost.associations = (db) => {
    db.CategoryPost.hasMany(db.Post, {
        foreignKey: {
            name: 'category_id',
        },
    });
};

module.exports = () => CategoryPost;
