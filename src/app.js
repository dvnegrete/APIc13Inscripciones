const express = require("express");
const routerAPI = require("./routes");
const cors = require("cors");
//const { corsHandler } = require("./middlewares/corsHandler");
const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/errorHandler");

const app = express();

//app.use(corsHandler)
app.use(cors());
require("./utils/auth");
app.use(express.json());
routerAPI(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;