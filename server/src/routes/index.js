const express = require("express");
const router = express.Router();
const helloWorldRouter = require("./helloworld.routes");

router.use("/test", helloWorldRouter);

module.exports = router