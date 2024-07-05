import { getSpreedSheet } from "./../libs/spreedsheet.js";
import { selectIdGSheet, selectModel } from "./../models/spreadsheetsOfertaEducativa.js";

async function frontendURLService(id, size = undefined) {
    const sheetName = selectIdGSheet(id);
    const rows = await getSpreedSheet(sheetName);
    const data = selectModel(id, rows, size)
    const infoResult = { ...data };
    return infoResult;
}

export default frontendURLService;