require("module-alias/register");
const express = require("express");
const router = express.Router();

// index router version 1

router.get("/", (req, res, next) => {
  const allowed_ips = ["::1", "::ffff:10.1.38.116"];
  console.log("req.socket.remoteAddress", req.socket.remoteAddress);
  console.log(allowed_ips.includes(req.socket.remoteAddress));
  if (allowed_ips.includes(req.socket.remoteAddress)) {
    res.json({ message: "Welcome to api v1" });
  } else {
    res.end("FORBIDDEN");
  }
});

router.get("/users", (req, res, next) => {
  console.log("ip", req.socket.remoteAddress);
  const users = [
    {
      id: 1,
      username: "Alex",
    },
    {
      id: 2,
      username: "Tom",
    },
  ];
  res.send(users);
});

router.use("/user", require("@routes/v1/user.route.js"));

module.exports = router;
