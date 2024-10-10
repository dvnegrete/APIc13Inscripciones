import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import morgan from "morgan";

import { authStrategy } from "./auth/index.js";
import { routerAPI } from "./routes/router.js";
import {
  cors,
  boomErrorHandler,
  errorHandler,
  logErrors,
} from "./middlewares/index.js";

export const app = express();
app.use(cors);
app.use(cookieParser());
app.use(morgan(':date[clf] - :method :url :status :res[content-length] - :response-time ms'))
app.use(passport.initialize());
authStrategy();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routerAPI(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
