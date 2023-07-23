const express = require("express");
const router = express.Router();
const helloWorldController = require("../controllers/helloworld.controller")

router.get("/hello_world", helloWorldController.helloWorldController)

module.exports = router