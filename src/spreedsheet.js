const { GoogleSpreadsheet } = require("google-spreadsheet");

const credentials = require("./json/keysGoogle.json");
const config = require("../config/config");
//credenciales en JSON como variables de entorno a implementar mas adelante
//const credentials = config.credentialGoogle;
const idGoogleSheet = config.idGoogleSheet;

async function conexionGoogleSheet() {
    //creando nueva instancia de Googlesheet
    const doc = new GoogleSpreadsheet(idGoogleSheet);
    //console.log(doc.title)
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["Hoja 1"];
    return sheet;    
}

module.exports = {
    conexionGoogleSheet: conexionGoogleSheet,
}