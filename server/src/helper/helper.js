const buildErrorReturn = (error) => {
    const errorMessage = error.message || JSON.stringify(error);
    const errorTrace = error.stack || "Error Has no Trace";

    return {
        Error: "X",
        Errormessage: errorMessage,
        Trace: errorTrace,
    }
}

module.exports = {
    buildErrorReturn,
}