const express = require("express");
const routerAPI = require("./routes")

const app = express();
routerAPI(app);

module.exports = app;