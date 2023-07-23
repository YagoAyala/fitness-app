const helloWorldService = require("../services/helloworld.service")

const helloWorldController = async (req, res) => {
    return res.status(200).send(helloWorldService.helloWorldService())
}

module.exports = {
    helloWorldController
}