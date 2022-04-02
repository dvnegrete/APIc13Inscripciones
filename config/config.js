require("dotenv").config();
const credentialGoogle = require("../keysGoogle.json")

const config = {
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    idSheetCourses: process.env.ID_SHEET_COURSES,
    apiKey: process.env.API_KEY,
    idGoogleSheetServicesAccount: process.env.ID_GOOGLE_SHEETS_SERVICES_ACCOUNT,
    googleAccount: process.env.GOOGLE_ACCOUNT,
    credentialGoogle: credentialGoogle
}

module.exports = config;