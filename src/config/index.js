import 'dotenv/config'
import credentialGoogle from "./../../keysGoogle.json" with {type: "json"};
import credentialFirebase from "./../../keysFirebase.json" with {type: "json"};

export const config = {
    port: process.env.PORT || 3000,
    idSheetCourses: process.env.ID_SHEET_COURSES,
    idGoogleRegisterInscription: process.env.ID_SHEET_REGISTER_INSCRIPTION,
    secret: process.env.SECRET,
    azureStorageConnection: process.env.AZURE_STORAGE_CONNECTION,
    dateForCurp: process.env.DATE_FOR_CURP,
    // Firebase
    realtimeDB: process.env.REALTIMEDB,
    // DB
    hostDB:process.env.HOST_DB,
    userDB:process.env.USER_DB,
    passDB:process.env.PASS_DB,
    portDB:process.env.PORT_DB,
    nameDB:process.env.NAME_DB,

    credentialGoogle: credentialGoogle,
    credentialFirebase: credentialFirebase,
}