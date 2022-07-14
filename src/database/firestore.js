const { credentialGoogle, credentialFirebase } = require("../../config/config")
const admin = require("firebase-admin")
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
//const { getApp, initializeApp } = require("firebase/app")
//const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore")
//const { ref, getStorage, uploadBytes } = require("firebase/storage")
//const { getStorage } = require("firebase-admin/storage")
const { docsRoute } = require("../utils/docs/")
const { Blob } = require("node:buffer");

//const uploadStorage  = require("./firebaseStorage")

const firebaseConfig = {
  ...credentialGoogle,
}
const BUCKET = "backend-cursos-cecati13.appspot.com"

initializeApp({
  credential: cert(credentialFirebase),
  storageBucket: BUCKET
});

function convertFileOfBlob(file){
  const blob = new Blob([file], { type: 'image/jpeg' })
  return blob
}

const bucket = admin.storage().bucket()
//const storage = getStorage()
//const db = getFirestore();

function uploadFirebase(fileParam) {
  const blob = convertFileOfBlob(fileParam)
  console.log("En firestores Blob: ", blob)
  // const bucket = getStorage().bucket();
  //console.log(fileParam.filename)
  const name = fileParam.filename
  const file = bucket.file(blob)
  //falta hacer que suba el archivo, solo parece subir la informacion del parametro name
  
  const stream = file.createWriteStream({
    // metadata: {
    //   contentType: file.mimetype,
    // },
    // resumable: false
  })

  stream.on("error", (e)=> {
    console.log(e)
  })

  stream.on("finish", async ()=> {
    await file.makePublic();    

    URL = `https://storage.googleapis.com/${BUCKET}/${name}`
  })
  
  stream.end(blob)
  return { url: URL}
}

function createBlob(file) {
  let reader = new FileReader();
  reader.onload = function() {
    console.log(reader.result);    
    const blob = window.dataURLtoBlob(reader.result);
    console.log(blob, new File([blob], "image.jpeg", {
      type: "image/jpeg"
    }));
  };
  reader.readAsDataURL(file);
};

// function uploadFirebase(name, archivo) {

//   //createBlob(archivo)  
// const newBlob = new Blob(archivo)
// console.log(newBlob)
  
// //Un ejemplo para leer contenido de archivo usando fs.readFile
//   function leer(docsRoute, callback) {
//       fs.readFile(ruta, (err, data) => {
//           console.log(data.toString());
//       })
//   }

// //leer(__dirname + "/archivo.txt", console.log);
  
//   //console.log(fileNode)
//   // const bucket = getStorage().bucket();
//   //console.log(archivo)
//   //const name = fileParam.filename
//   const file = bucket.file(file)
//   //falta hacer que suba el archivo, solo parece subir la informacion del parametro name
  
//   const stream = file.createWriteStream({
//     metadata: {
//       contentType: file.mimetype,
//     },
//     //resumable: false
//   })

//   stream.on("error", (e)=> {
//     console.log(e.message)
//   })

//   stream.on("finish", async ()=> {
//     await file.makePublic();

//     URL = `https://storage.googleapis.com/${BUCKET}/${name}`
//   })
  
//   stream.end(archivo)
//   return { url: URL}
// }

module.exports = {
    //database: db,
    //storage: storage,
    uploadFirebase: uploadFirebase
};
