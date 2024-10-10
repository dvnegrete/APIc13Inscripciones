import { googleAuth } from "./googleAuthJwt.js";

async function spreedsheetGoogle(sheetName) {
  const doc = googleAuth(sheetName);
  await doc.loadInfo();
  return doc.sheetsByTitle[sheetName];
}

export const getSpreedSheet = async (sheetName) => {
  try {
    const sheet = await spreedsheetGoogle(sheetName);
    return await sheet.getRows();
  } catch (error) {
    console.log(error)
  }
};

//metodos al usar DB Spreadsheet
export const postSpreedSheet = async (objInscription) => {
  const sheet = await spreedsheetGoogle(objInscription.sheet);
  await sheet.addRow(objInscription);
};
