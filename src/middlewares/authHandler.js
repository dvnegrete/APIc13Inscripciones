const { apiKey, secret } = require("../../config")
const jwt = require("jsonwebtoken");

function checkApiKey (req, res, next) {
    const key = req.headers['api'];
    if(key === apiKey) {
        next();
    } else {
        console.log("AuthHandler. No autorizado")
        return { access: false }
    }    
}

const jwtConfig = {
    expiresIn: '1d'
};

function signToken (payload, secret, jwtConfig) {
    return jwt.sign(payload, secret, jwtConfig);
}

function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}


module.exports = { checkApiKey, signToken, verifyToken };