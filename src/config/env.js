require("dotenv").config();

const Sequelize = require("sequelize");

const env = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  port: process.env.DB_PORT,
};

const input_connnection = {
  host: env.host,
  port: env.port,
  dialect: "mysql",
  query: { raw: true },
  pool: {
    max: 30,
    min: 0,
    acquire: 60000,
    idle: 5000,
  },
  define: {
    hooks: true,
  },
  timezone: "+07:00",
  // logging: true,
};

const sequelize = new Sequelize(
  env.database,
  env.user,
  env.password,
  input_connnection
);

module.exports = sequelize;
