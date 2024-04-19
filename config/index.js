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
    realtimeDB: process.env.REALTIMEDB,
    clientIdMs: process.env.CLIENT_ID_MS,
    clientSecretMs: process.env.CLIENT_SECRET_MS,
    tenantID: process.env.TENANT_ID
}

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID_MS, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: process.env.CLOUD_INSTANCE + process.env.TENANT_ID, // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret: process.env.CLIENT_SECRET_MS // Client secret generated from the app registration in Azure portal
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    }
}
const REDIRECT_URI = process.env.REDIRECT_URI;
const POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI;
const GRAPH_ME_ENDPOINT = process.env.GRAPH_API_ENDPOINT + "v1.0/me";

module.exports = config;