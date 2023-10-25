require("module-alias/register");
const cors = require("cors");
const express = require("express");
const body_parser = require("body-parser");
const { options } = require("@config/cors");
const { restrict_ips } = require("@config/restrict-ips");
const connect_db = require("./config/connect-db");

const app = express();

/** RESTRICT IPS */
// app.use((req, res, next) => {
//   const check_ip = restrict_ips(req.socket.remoteAddress, res);
//   if (!check_ip) {
//     res.end("FORBIDDEN");
//   }
//   next();
// });

/** CORS */
app.use(cors(options));

/** TEST CONNECT DB */
connect_db();

/** Handle with every request */
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// Routers
app.use("/api", require("@routes"));

module.exports = app;
