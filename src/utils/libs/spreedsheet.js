const { GoogleSpreadsheet } = require("google-spreadsheet");
const config = require("../../../config/config");
const { idSheetCourses, idGoogleRegisterInscription, credentialGoogle } = config;

function GSheetID(sheetName){
    let idSheet = ""
    switch (sheetName) {
        //nombre de GSheets: Registro Inscripción
        //nombres de hojas en GSheets:
        case "registro_inscripciones" || "matricula&curp":            
            idSheet = idGoogleRegisterInscription
            break;    
        default:
            //nombre de GSheets: Oferta Educativa
            //nombres de hojas: Cursos, inscripciones, preguntas            
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
    const sheet = await conexionGoogleSheet("inscripciones");
    await sheet.addRow(objInscription);
}

module.exports = {
    getSpreedSheat: getSpreedSheat,
    postSpreedSheat: postSpreedSheat,
}