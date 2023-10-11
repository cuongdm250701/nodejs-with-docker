const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const sequelize = require('@config/env.js');

const db = {};
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
    );
    db[model.name] = model;
  });
  
console.log('db ', db);