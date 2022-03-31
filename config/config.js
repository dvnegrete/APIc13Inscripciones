require("dotenv").config();

const config = {
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    idGoogleSheet: process.env.ID_GOOGLE_SHEETS,
    credentialGoogle: process.env.CREDENTIALS_GOOGLE
}

module.exports = config;