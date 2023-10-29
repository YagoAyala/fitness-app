const { admin } = require("../../database/database") // yago
const adminAuth = admin.auth()

const signUpService = async (email, password) => {
    const userRecord = await adminAuth.createUser({
      email,
      password,
    });

    console.log(userRecord, "userRecord", email, password,"password")

    const namespace = "yago"

    const result = await adminAuth.setCustomUserClaims(userRecord.uid, { namespace });
    console.log(result, "result")
    return "X"
}

const signInService = async (email, password) => {
    const userRecord = await adminAuth.signInWithEmailAndPassword(email, password);
    console.log(userRecord, "userRecord")
    return "X"
}

module.exports = {
    signUpService,
    signInService
}