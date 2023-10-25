require("module-alias/register");
const express = require("express");
const router = express.Router();

// index router version 1
router.get("/", (req, res, next) => {
  res.json({ message: "Welcome to api v1" });
});

// test router

router.get("/users", (req, res, next) => {
  const users = [
    {
      id: 1,
      name: "cuongdm",
    },
    {
      id: 2,
      name: "cuongdm1",
    },
    {
      id: 3,
      name: "cuongdm2",
    },
    {
      id: 4,
      name: "cuongdm3",
    },
  ];
  res.json({ message: "Successfully", data: users });
});

router.use("/users", require("@routes/v1/user.route"));
router.use("/category-posts", require("@routes/v1/category-post.route"));
router.use("/posts", require("@routes/v1/post.route"));
router.use("/comments", require("@routes/v1/comment.route"));

module.exports = router;
