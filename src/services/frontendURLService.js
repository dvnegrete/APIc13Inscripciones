const { getSpreedSheet } = require("../libs/spreedsheet");
const { selectIdGSheet, selectModel } = require("../models/spreadsheetsOfertaEducativa");

async function frontendURLService (id, size=undefined){
    const sheetName =  selectIdGSheet(id);
    const rows = await getSpreedSheet(sheetName);
    const data = selectModel(id, rows, size)
    const infoResult = {...data};
    return infoResult;
}

module.exports = frontendURLService;