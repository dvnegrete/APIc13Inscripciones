import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { config } from "./../config/index.js";

const formattedPrivateKey = config.private_key.replace(/\\n/g, '\n');

const serviceAccountAuth = new JWT({
  email: config.client_email,
  key: formattedPrivateKey,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ],
});

export const docGoogleAuth = (idSheet) => new GoogleSpreadsheet(idSheet, serviceAccountAuth);
