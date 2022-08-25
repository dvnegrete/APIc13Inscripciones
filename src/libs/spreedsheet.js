const { GoogleAuth } = require("google-auth-library");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { googleAccount } = require("../../config/config");
const config = require("../../config/config");
const { sheetHomePage } = require("../models/namesSheet");
const { idSheetCourses, idGoogleRegisterInscription, credentialGoogle } = config;
const nameSheet = require("../models/namesSheet");
const { ubicationColumn, updateableData, rangeData } = require("../models/sheetGoogle/databaseModel");

//para pruebas
//const {updateGoogleApis} = require("./googleapis")

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
    return idSheet;
}

async function conexionGoogleSheet(sheetName) {
        //creando nueva instancia de Googlesheet
        const idSheet = GSheetID(sheetName);
        const doc = new GoogleSpreadsheet(idSheet);
        await doc.useServiceAccountAuth(credentialGoogle);
        await doc.loadInfo();

        //probando otra forma de autentificacion con SpreedSheats
        //const doc = new GoogleSpreadsheet(idSheet)
        //await doc.useServiceAccountAuth(credentialGoogle)
        
        //seleccionando hoja a trabajar
        const sheet = doc.sheetsByTitle[sheetName];
        return sheet;
}

async function getSpreedSheet(sheetName){
    try {
        const sheet = await conexionGoogleSheet(sheetName);
        const rows = await sheet.getRows();
        return rows;
    } catch (error) {
        console.log("Error en getSpreedSheat")
    }
}

async function postSpreedSheet(objInscription) {
    const sheet = await conexionGoogleSheet(objInscription.sheet);
    await sheet.addRow(objInscription);
}

async function updateSpreedSheet(objUpdate){
    try {    
        //const idSheet = GSheetID(objUpdate.sheet);        
        const sheet = await conexionGoogleSheet(objUpdate.sheet);
        const columnCurp = ubicationColumn(objUpdate.curp) //por default regresa curp
        await sheet.loadCells(`${columnCurp}:${columnCurp}`); //rango de curp
        const totalRows = sheet.rowCount;
        const newObjUpdate = {
            totalRows,
            curp: objUpdate.curp,
            columnCurp,
            sheet
        };
        const index = await findRowOnSpreedsheets(newObjUpdate);
        //las celdas que se deben cargar antes de poder escribir sobre ellas.
        await sheet.loadCells(`${rangeData}${index+1}`); //rango de datos actualizables + 1
        let nameColumnsArray = countDataUpdate(objUpdate);
        while (nameColumnsArray.length > 0) {
            //actulizando datos en Spreedsheets
            const column = ubicationColumn(nameColumnsArray[0]);
            const dataUpdate = sheet.getCellByA1(`${column}${index}`);
            dataUpdate.value = objUpdate[nameColumnsArray[0]];
            nameColumnsArray.shift();
        }
        //guardando cambios en spreedsheets
        await sheet.saveUpdatedCells();
        return true;
    } catch (error) {
        console.log("Error en updateSpreedSheat");
        return false;
    }
}

async function findRowOnSpreedsheets (obj){
    let index = 0;
    for (let i = 1; i <= obj.totalRows; i++) {
        const cell = obj.sheet.getCellByA1(`${obj.columnCurp}${i}`);        
        if (cell.value === obj.curp) {
            index = i;
            break;
        }
    }
    return index
}

function countDataUpdate(obj) {
    const keys = Object.keys(obj);
    const columnsUpdateable = updateableData(keys);
    return columnsUpdateable;
}

module.exports = {
    getSpreedSheet: getSpreedSheet,
    postSpreedSheet: postSpreedSheet,
    updateSpreedSheet: updateSpreedSheet    
}