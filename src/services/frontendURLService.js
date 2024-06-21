import { getSpreedSheet } from "./../libs/spreedsheet.js";
//const { getSpreedSheet } = require("../libs/spreedsheet");
import { selectIdGSheet, selectModel } from "./../models/spreadsheetsOfertaEducativa.js";
//const { selectIdGSheet, selectModel } = require("../models/spreadsheetsOfertaEducativa");

async function frontendURLService(id, size = undefined) {
    const sheetName = selectIdGSheet(id);
    const rows = await getSpreedSheet(sheetName);
    const data = selectModel(id, rows, size)
    const infoResult = { ...data };
    return infoResult;
}

//module.exports = frontendURLService;
export default frontendURLService;