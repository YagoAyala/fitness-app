const buildErrorReturn = (error) => {
    const errorMessage = error.message || JSON.stringify(error);
    const errorTrace = error.stack || "Error Has no Trace";

    return {
        Error: "X",
        Errormessage: errorMessage,
        Trace: errorTrace,
    }
}

const checkIfObjectHasKeys = (obj) => {
    return Object.keys(obj).length > 0;
}

module.exports = {
    buildErrorReturn,
    checkIfObjectHasKeys,
}