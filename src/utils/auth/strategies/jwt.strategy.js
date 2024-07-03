import { Strategy, ExtractJwt } from "passport-jwt";
//const { Strategy, ExtractJwt  } = require("passport-jwt");
import { config } from "./../../../config/index.js";
//const { secret } = require("../../../../config");
import { forbidden } from "@hapi/boom";
//const boom = require("@hapi/boom");

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

//module.exports = JwtStrategy;