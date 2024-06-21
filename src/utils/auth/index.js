import passport from "passport";
//const passport = require("passport");

import { LocalStrategy } from "./strategies/local.strategy.js";
//const LocalStrategy = require("./strategies/local.strategy");
import { JwtStrategy } from "./strategies/jwt.strategy.js";
//const JwtStrategy = require("./strategies/jwt.strategy");

export const authStrategy = () => {
    passport.use(LocalStrategy);
    passport.use(JwtStrategy);
}