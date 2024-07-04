import jwt from "jsonwebtoken";

const jwtConfig = {
    expiresIn: '1d'
};

export function signToken(payload, secret, jwtConfig) {
    return jwt.sign(payload, secret, jwtConfig);
}

export function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

//module.exports = { signToken, verifyToken, authMSAL };