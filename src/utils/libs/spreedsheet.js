const { GoogleSpreadsheet } = require("google-spreadsheet");
const config = require("../../../config/config");
const { idSheetCourses, idGoogleRegisterInscription, credentialGoogle } = config;
const nameSheet = require("../../models/namesSheet");

function GSheetID(sheetName){
    //console.log("GetSpreedSheet id : ", sheetName) 
    let idSheet = ""
    switch (sheetName) {
        //nombres de GSheets en Registro Inscripción    
        case nameSheet.sheetInscriptions:
            idSheet = idGoogleRegisterInscription;
            break;
        case nameSheet.sheetDatabase:
            idSheet = idGoogleRegisterInscription;
            break;
        case nameSheet.sheetNumberControl:
            idSheet = idGoogleRegisterInscription;
            break;
        //Termina nombres de GSheets en Registro Inscripción
        default:
            //GSheets en Oferta Educativa
            idSheet = idSheetCourses
            break;
    }    
    return idSheet
}

async function conexionGoogleSheet(sheetName) {
    //creando nueva instancia de Googlesheet    
    const idSheet = GSheetID(sheetName);    
    const doc = new GoogleSpreadsheet(idSheet);    
    await doc.useServiceAccountAuth(credentialGoogle);
    await doc.loadInfo();    
    
    //seleccionando hoja a trabajar
    const sheet = doc.sheetsByTitle[sheetName];    
    return sheet;
}

async function getSpreedSheat(sheetName){
    const sheet = await conexionGoogleSheet(sheetName);
    const rows = await sheet.getRows();
    return rows;
}

async function postSpreedSheat(objInscription) {
    const sheet = await conexionGoogleSheet(objInscription.sheet);
    await sheet.addRow(objInscription);    
}

module.exports = {
    getSpreedSheat: getSpreedSheat,
    postSpreedSheat: postSpreedSheat,
}