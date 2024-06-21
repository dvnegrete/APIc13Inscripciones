import { config } from "./../config/index.js";
//const { apiKey, secret } = require("../../config")
import jwt from "jsonwebtoken";
//const jwt = require("jsonwebtoken");

export function checkApiKey(req, res, next) {
    const key = req.headers['api'];
    if (key === config.apiKey) {
        next();
    } else {
        console.log("AuthHandler. No autorizado")
        return { access: false }
    }
}

const jwtConfig = {
    expiresIn: '1d'
};

export function signToken(payload, secret, jwtConfig) {
    return jwt.sign(payload, secret, jwtConfig);
}

export function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

//module.exports = { checkApiKey, signToken, verifyToken, authMSAL };