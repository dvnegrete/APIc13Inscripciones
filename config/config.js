require("dotenv").config();
const credentialGoogle = require("../keysGoogle.json")

const config = {
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    idSheetCourses: process.env.ID_SHEET_COURSES,
    apiKey: process.env.API_KEY,
    idGoogleRegisterInscription: process.env.ID_ShEET_REGISTER_INSCRIPTION,
    googleAccount: process.env.GOOGLE_ACCOUNT,
    credentialGoogle: credentialGoogle
}

module.exports = config;