const express = require("express");
const router = express.Router();
const helloWorldRouter = require("./helloworld.routes");
const authenticationRouter = require("./authentication.routes");


router.use("/test", helloWorldRouter);
router.use("/authentication", authenticationRouter);


module.exports = router