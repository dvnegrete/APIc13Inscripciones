import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";

import { configSession } from "./config/index.js";
import { authStrategy } from "./utils/auth/index.js";
import { boomErrorHandler, errorHandler, logErrors, corsHandler } from "./middlewares/index.js";
import { routerAPI } from "./routes/index.js";

export const app = express();

app.use(corsHandler)
app.use(session(configSession));

app.use(cookieParser());
app.use(passport.initialize());
authStrategy();
app.use(express.json());

routerAPI(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);