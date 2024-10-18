import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { config } from "../config/index.js";
import { nameSheet } from "../models/namesSheet.js";

const formattedPrivateKey = config.privateKey.replace(/\\n/g, "\n");

const serviceAccountAuth = new JWT({
  email: config.clientEmail,
  key: formattedPrivateKey,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

function GSheetID(name) {
  return name === nameSheet.sheetInscriptions
    ? config.idGoogleRegisterInscription
    : config.idSheet;
}

export const googleAuth = (name) => {
  const idSheet = GSheetID(name);
  return new GoogleSpreadsheet(idSheet, serviceAccountAuth);
};
