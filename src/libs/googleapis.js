const { google } = require("googleapis");
const { credentialGoogle } = require("../../config/config")
const projectId = 'backend-cursos-cecati13'
const keyFilename = '../../keysGoogle.json'


async function updateGoogleApis (sheet){
    console.log("CRED GOOGLE: ", keyFilename)
    const auth = new google.auth.GoogleAuth({
        projectId: projectId,
        keyFilename: keyFilename,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });    
    const client = await auth.getClient();    
    const googleSheets = google.sheets({ version: "v4", auth: client})
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId: sheet  
    })

    console.log(metaData.data);
}

module.exports = {
    updateGoogleApis: updateGoogleApis
}