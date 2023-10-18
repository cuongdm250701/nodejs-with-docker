require("module-alias/register");
const express = require("express");
const router = express.Router();

router.use("/api/v1", require("@routes/v1"));
router.use("/api/v2", require("@routes/v2"));

module.exports = router;
