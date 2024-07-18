import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import morgan from "morgan";

import { authStrategy } from "./utils/auth/index.js";
import { boomErrorHandler, errorHandler, logErrors, corsHandler } from "./middlewares/index.js";
import { routerAPI } from "./routes/index.js";

export const app = express();

app.use(corsHandler)
app.use(cookieParser());
app.use(morgan(':date[clf] - :method :url :status :res[content-length] - :response-time ms'))
app.use(passport.initialize());
authStrategy();
app.use(express.json());

routerAPI(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);