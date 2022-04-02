const { GoogleSpreadsheet } = require("google-spreadsheet");
const config = require("../../../config/config");
const { idGoogleSheetServicesAccount, credentialGoogle } = config;

async function conexionGoogleSheet(sheetName) {
    //creando nueva instancia de Googlesheet
    const doc = new GoogleSpreadsheet(idGoogleSheetServicesAccount);
    await doc.useServiceAccountAuth(credentialGoogle);
    await doc.loadInfo();
    //seleccionando hoja a trabajar
    const sheet = doc.sheetsByTitle[sheetName];
    return sheet;
}

async function getSpreedSheat (sheetName){
    const sheet = await conexionGoogleSheet(sheetName);
    return sheet;
}

async function postSpreedSheat(objInscription) {
    const sheet = await conexionGoogleSheet("inscripciones");
    await sheet.addRow(objInscription);
}

module.exports = {
    getSpreedSheat: getSpreedSheat,
    postSpreedSheat: postSpreedSheat,
}