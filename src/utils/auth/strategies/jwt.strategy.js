const { Strategy, ExtractJwt  } = require("passport-jwt");
const { secret } = require("../../../../config");
const boom = require("@hapi/boom");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

const JwtStrategy = new Strategy(options, (payload, done)=>{
    try {
        return done(null, payload);        
    } catch (error) {
        throw boom.forbidden(error);
    }
});

module.exports = JwtStrategy;