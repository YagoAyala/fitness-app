const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes/index")

const app = express();
const port = 3002;

const router = express.Router();
router.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.listen(port, () => {
	console.log(`Server port: ${port}`);
});

module.exports = app;
