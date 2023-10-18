require("module-alias/register");
const cors = require("cors");
const express = require("express");
const body_parser = require("body-parser");
// const { options } = require("@config/cors");
const connect_db = require("./config/connect-db");

const app = express();

/** CORS */
app.use(
  cors({
    origin: ["https://www.workfall.com", "http://10.1.38.116:3001"],
  })
);

/** TEST CONNECT DB */
connect_db();

/** Handle with every request */
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// Routers
app.use("/", require("@routes"));

module.exports = app;
