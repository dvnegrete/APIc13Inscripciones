const express = require("express");
const routerAPI = require("./routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
routerAPI(app);

module.exports = app;