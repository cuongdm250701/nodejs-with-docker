require("module-alias/register");
const express = require("express");
const body_parser = require("body-parser");
const connect_db = require("./config/connect-db");

const app = express();

connect_db();
/** Handle with every request */
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// Routers
app.use("/", require("@routes"));

module.exports = app;
