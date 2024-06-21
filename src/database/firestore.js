import { config } from "./../config/index.js";
//const { realtimeDB, credentialFirebase } = require("./../../config")
import { initializeApp } from "firebase-admin/app";
//const { initializeApp } = require("firebase-admin/app");
import firebaseAdmin from "firebase-admin";
//const { credential } = require("firebase-admin");
import { getFirestore } from "firebase-admin/firestore";
//const { getFirestore } = require("firebase-admin/firestore")

initializeApp({
  credential: firebaseAdmin.credential.cert(config.credentialFirebase),
  databaseURL: config.realtimeDB  
})

export const database = getFirestore();

// module.exports = {
//   database: db,
//   auth
// };