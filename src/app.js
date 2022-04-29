const express = require("express");
const routerAPI = require("./routes");
const cors = require("cors");
const { corsHandler } = require("./middlewares/corsHandler");

const app = express();

app.use(corsHandler)
app.use(cors());
app.use(express.json());
routerAPI(app);

module.exports = app;