import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import { routerAPI } from "./routes/index.js";
//const routerAPI = require("./routes");
//const cors = require("cors");
import { corsHandler } from "./middlewares/corsHandler.js";
//const { corsHandler } = require("./middlewares/corsHandler");
import { boomErrorHandler, errorHandler, logErrors } from "./middlewares/errorHandler.js";
import { authStrategy } from "./utils/auth/index.js";
//const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/errorHandler");

export const app = express();

app.use(corsHandler)
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // set this to true on production
    }
}));

app.use(cookieParser());
authStrategy();
app.use(express.json());

routerAPI(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);