const { getSpreedSheat } = require("../utils/libs/spreedsheet");
const { selectIdGSheet, selectModel } = require("../models/spreadsheetsOfertaEducativa");

async function frontendURLService (id){
    const sheetName =  selectIdGSheet(id);
    const rows = await getSpreedSheat(sheetName);
    const data = selectModel(id, rows)
    const infoResult = {...data};    
    return infoResult;
}

module.exports = frontendURLService;