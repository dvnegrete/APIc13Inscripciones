const { GoogleSpreadsheet } = require("google-spreadsheet");

const credentials = require("./json/keysGoogle.json");
const config = require("../config/config");
//credenciales en JSON como variables de entorno a implementar mas adelante
//const credentials = config.credentialGoogle;
const idGoogleSheet = config.idGoogleSheet;

async function conexionGoogleSheet(sheetName) {
    //creando nueva instancia de Googlesheet
    const doc = new GoogleSpreadsheet(idGoogleSheet);
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();
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