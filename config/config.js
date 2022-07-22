require("dotenv").config();
const credentialGoogle = require("../keysGoogle.json")
const credentialFirebase = require("../keysFirebase.json")

const config = {
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    idSheetCourses: process.env.ID_SHEET_COURSES,
    //api_key of Google Storage
    apiKey: process.env.API_KEY,
    idGoogleRegisterInscription: process.env.ID_ShEET_REGISTER_INSCRIPTION,
    googleAccount: process.env.GOOGLE_ACCOUNT,
    credentialGoogle: credentialGoogle,
    credentialFirebase: credentialFirebase,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME
}

module.exports = config;