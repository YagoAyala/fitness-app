const crud = require("../crud/crud");
const CONST = require("../helper/constants");
const bcrypt = require('bcryptjs');

//TODO: add this functions validation into the helper.

const isPasswordSafe = (password) => {
    const MIN_LENGTH = 8;

    if (password.length < MIN_LENGTH) {
        throw new Error(`Password length must be higher than ${MIN_LENGTH}`);
    }

    if (!/[a-z]/.test(password)) {
        throw new Error("Password must have a lower case letter");
    }

    if (!/[A-Z]/.test(password)) {
        throw new Error("Password must have an upper case letter");
    }

    if (!/[0-9]/.test(password)) {
        throw new Error("Password must have a number");
    }

    if (!/[!@#$%^&*]/.test(password)) {
        throw new Error("Password must have a special character");
    }
};

const validateUsername = (username) => {
    if (!username || typeof username !== "string") {
        throw new Error("Username is not valid or not a string");
    }
}

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
        throw new Error("Email is not valid");
    }
}

const ensureSignUpArguments = (username, email, password) => {
    validateUsername(username);
    validateEmail(email);
    isPasswordSafe(password);
};

const getUserFromDatabase = async (user, property, value) => {
    const filter = [{
        [CONST.Filter.Property]: property,
        [CONST.Filter.Operator]: CONST.Filter.Operators.Equal,
        [CONST.Filter.Value]: value,
    }];

    const users = await crud.getByFilter(user, "User", filter);

    return users;
};

const checkUserExistence = async (user, property, value) => {
    const users = await getUserFromDatabase (user, property, value);

    if (users.length) {
        throw new Error(`${property} already taken.`);
    }
}

const signUpService = async (user, username, email, password) => {
    ensureSignUpArguments(username, email, password);

    await checkUserExistence(user, "Email", email);
    await checkUserExistence(user, "Username", username);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUserEntity = {
        Email: email,
        Username: username,
        Password: hashedPassword
    };

    return await crud.create(user, "User", newUserEntity);
};

const signInService = async (user, username, password) => {
    // TODO: Improve to add login by email

    const [userFromDatabase] = await getUserFromDatabase(user, "Username", username);

    if (!userFromDatabase?.Username) {
        throw new Error("User not found.");
    }

    const isPasswordValid = await bcrypt.compare(password, userFromDatabase.Password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    return {Ok: "ok", Message: "Successfully logged in"};
}

module.exports = {
    signUpService,
    signInService
}