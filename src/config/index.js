import 'dotenv/config'
import credentialGoogle from "./../../keysGoogle.json" with {type: "json"};
import credentialFirebase from "./../../keysFirebase.json" with {type: "json"};

export const config = {
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