const { getSpreedSheet } = require("../libs/spreedsheet");
const { selectIdGSheet, selectModel } = require("../models/spreadsheetsOfertaEducativa");

async function coursesFront196 (){
    const id = 196;
    const sheetName =  selectIdGSheet(id);
    const rows = await getSpreedSheet(sheetName);
    const data = selectModel(id, rows, undefined);
    const infoResult = {...data};
    return infoResult;
}

module.exports = coursesFront196;