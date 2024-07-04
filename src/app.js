import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import { routerAPI } from "./routes/index.js";
import { corsHandler } from "./middlewares/corsHandler.js";
import { boomErrorHandler, errorHandler, logErrors } from "./middlewares/errorHandler.js";
import { authStrategy } from "./utils/auth/index.js";

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
app.use(passport.initialize());
authStrategy();
app.use(express.json());

routerAPI(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);