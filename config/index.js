require("dotenv").config();
const credentialGoogle = require("../keysGoogle.json")
const credentialFirebase = require("../keysFirebase.json")

const config = {
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    idSheetCourses: process.env.ID_SHEET_COURSES,
    idGoogleRegisterInscription: process.env.ID_ShEET_REGISTER_INSCRIPTION,  
    idsheet196Courses: process.env.ID_SHEET_196_COURSES,
    //api_key of Google Storage
    apiKey: process.env.API_KEY,
    secret: process.env.SECRET,
    credentialGoogle: credentialGoogle,
    credentialFirebase: credentialFirebase,
    azureStorageConnection: process.env.AZURE_STORAGE_CONNECTION,
    dateForCurp: process.env.DATE_FOR_CURP,
    realtimeDB: process.env.REALTIMEDB
}

module.exports = config;