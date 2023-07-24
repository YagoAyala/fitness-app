const { database } = require("../../firebase");

const collection = database.collection("hello_world").doc("hello");

const helloWorldService = () => {
    collection.update({
        hello: "hello_world"
    })
}

module.exports = {
    helloWorldService
}