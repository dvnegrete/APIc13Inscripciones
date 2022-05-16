const { credentialGoogle } = require("../../config/config")
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore")

initializeApp({
  credential: cert(credentialGoogle)
});

const db = getFirestore();

module.exports = {
    database: db
};

