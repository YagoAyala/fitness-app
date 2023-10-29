const AuthenticationService = require("../services/authentication.service")

const signUpController = async (req, res) => {
    try {        
        const {Email, Password} = req.body
        const result = await AuthenticationService.signUpService(Email, Password)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const signInController = async (req, res) => {
    try {        
        const {Email, Password} = req.body
        const result = await AuthenticationService.signInService(Email, Password)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    signUpController,
    signInController
}