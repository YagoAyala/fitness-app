const AuthenticationService = require("../services/authentication.service")

const signUpController = async (req, res) => {
    try {        
        const {User, Username, Email, Password} = req.body;
        
        const result = await AuthenticationService.signUpService(User, Username, Email, Password);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const signInController = async (req, res) => {
    try {        
        const {User, Username, Password} = req.body
        
        const result = await AuthenticationService.signInService(User, Username, Password)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    signUpController,
    signInController
}