require("module-alias/register");
const express = require("express");
const connect_db = require("./config/connect-db");

const app = express();

connect_db();

app.use("/", require("@routes"));

module.exports = app;
