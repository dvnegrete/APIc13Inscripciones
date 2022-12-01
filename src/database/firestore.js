const { realtimeDB, credentialFirebase } = require("./../../config")
const { initializeApp, cert } = require("firebase-admin/app");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore")

initializeApp({
  credential : admin.credential.cert(credentialFirebase),  
  databaseURL : realtimeDB
})

const db = getFirestore();

module.exports = {
    database: db
};