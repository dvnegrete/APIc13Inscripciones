import { GoogleSpreadsheet } from "google-spreadsheet";
//const { GoogleSpreadsheet } = require("google-spreadsheet");
import { config } from "./../config/index.js";
//const config = require("../../config");
const { idSheetCourses, idGoogleRegisterInscription, credentialGoogle } = config;
import { nameSheet } from "./../models/namesSheet.js";
//const nameSheet = require("../models/namesSheet");
import {
    ubicationColumn,
    updateableData,
    firstComunUpdate,
    lastColumnUpdate,
    rangeDateRegister
} from "./../models/sheetGoogle/databaseModel.js";
//const { ubicationColumn, updateableData, firstComunUpdate, lastColumnUpdate, rangeDateRegister } = require("../models/sheetGoogle/databaseModel");

function GSheetID(sheetName) {
    //console.log("GetSpreedSheet id : ", sheetName)
    switch (sheetName) {
        //nombres de GSheets en Registro Inscripción
        case nameSheet.sheetInscriptions:
            return idGoogleRegisterInscription;
        case nameSheet.sheetDatabase:
            return idGoogleRegisterInscription;
        case nameSheet.sheetNumberControl:
            return idGoogleRegisterInscription;
        //Termina nombres de GSheets en Registro Inscripción

        //GSheets en Oferta Educativa
        default:
            return idSheetCourses;
    }
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

async function getSpreedSheet(sheetName) {
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

async function updateSpreedSheet(objUpdate) {
    try {
        const sheet = await conexionGoogleSheet(objUpdate.sheet);
        const index = objUpdate.indexR;
        await sheet.loadCells(`${firstComunUpdate}${index}:${lastColumnUpdate}${index}`);
        let nameColumnsArray = countDataUpdate(objUpdate);
        while (nameColumnsArray.length > 0) {
            //actulizando datos en Spreedsheets
            const column = ubicationColumn(nameColumnsArray[0]);
            const dataUpdate = sheet.getCellByA1(`${column}${index}`);
            dataUpdate.value = objUpdate[nameColumnsArray[0]];
            nameColumnsArray.shift();
        }
        await sheet.saveUpdatedCells();
        //guardando cambios en spreedsheets

        await sheet.loadCells(`${rangeDateRegister}${index}`); //rango de Fecha de Registro
        const dateUpdateRegister = sheet.getCellByA1(`${rangeDateRegister}${index}`);
        dateUpdateRegister.value = objUpdate.fechaRegistro;
        await sheet.saveUpdatedCells();

        return true;
    } catch (error) {
        console.log("Error en updateSpreedSheat");
        return false;
    }
}

function countDataUpdate(obj) {
    const keys = Object.keys(obj);
    const columnsUpdateable = updateableData(keys);
    return columnsUpdateable;
}

// module.exports = {
//     getSpreedSheet: getSpreedSheet,
//     postSpreedSheet: postSpreedSheet,
//     updateSpreedSheet: updateSpreedSheet
// }

export {
    getSpreedSheet,
    postSpreedSheet,
    updateSpreedSheet
}