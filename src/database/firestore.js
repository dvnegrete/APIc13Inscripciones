import { config } from "./../config/index.js";
import { initializeApp } from "firebase-admin/app";
import firebaseAdmin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: firebaseAdmin.credential.cert(config.credentialFirebase),
  databaseURL: config.realtimeDB  
})

export const database = getFirestore();