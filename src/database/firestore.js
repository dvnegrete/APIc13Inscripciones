const { credentialGoogle, credentialFirebase } = require("./../../config")
const { initializeApp, cert } = require("firebase-admin/app");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore")
const { getAuth, Auth, BaseAuth} = require("firebase-admin/auth");

//const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore")

const BUCKET = "backend-cursos-cecati13.appspot.com"
const URL = "https://backend-cursos-cecati13.firebaseapp.com/__/auth/handler"
const databaseURL = "https://backend-cursos-cecati13.firebaseio.com";
const realtimeDB = "https://backend-cursos-cecati13-default-rtdb.firebaseio.com/";
const collection = "administradores";


initializeApp({
  credential : admin.credential.cert(credentialFirebase),
  //storageBucket: BUCKET,
  databaseURL : realtimeDB
})
//const db = admin.database();
const db = getFirestore();

// async function database () {
//   console.log("entrado a database Firestore")
//   const userRef = await db.ref(collection).once('value', snapshot =>{
//     const data = snapshot.val();    
//     console.log(data)
//   })
//   return userRef
// }


module.exports = {
    //database,
    database: db
};