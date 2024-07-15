import passport from "passport";

import { LocalStrategy } from "./strategies/local.strategy.js";
import { JwtStrategy } from "./strategies/jwt.strategy.js";
import { MicrosoftStrategy } from "./strategies/msal.strategy.js";

export const authStrategy = () => {
    passport.use(LocalStrategy);
    passport.use(JwtStrategy);
    passport.use(MicrosoftStrategy)
}