import { Strategy, ExtractJwt } from "passport-jwt";
import { config } from "./../../../config/index.js";
import { forbidden } from "@hapi/boom";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
}

export const JwtStrategy = new Strategy(options, (payload, done) => {
    try {
        return done(null, payload);
    } catch (error) {
        throw forbidden(error);
    }
});
