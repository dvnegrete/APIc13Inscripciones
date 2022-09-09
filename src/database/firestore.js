const { credentialGoogle, credentialFirebase } = require("../../config")
const { initializeApp, cert } = require("firebase-admin/app");
//const { getApp, initializeApp } = require("firebase/app")
//const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore")
//const { ref, getStorage, uploadBytes } = require("firebase/storage")
const { getStorage } = require("firebase-admin/storage")
const { Blob } = require("node:buffer");
const fs = require('fs');

//const uploadStorage  = require("./firebaseStorage")

const firebaseConfig = {
  ...credentialFirebase,
}
const BUCKET = "backend-cursos-cecati13.appspot.com"

const firebaseAPP = initializeApp({ 
  credential: cert(credentialFirebase),
  storageBucket: BUCKET
});

function convertFileOfBlob(file){
  const blob = new Blob([file], { type: 'image/jpeg' })
  return blob
}
const bucket = getStorage().bucket();
//const bucket = admin.storage().bucket()
//const storage = getStorage()
//const db = getFirestore();

// function uploadFirebase(fileParam) {
//   const blob = convertFileOfBlob(fileParam)
//   //console.log("En firestores Blob: ", blob)
//   // const bucket = getStorage().bucket();
//   //console.log(fileParam.filename)
//   const name = fileParam.filename
//   const file = bucket.file(fileParam)
//   //const file = bucket.file(blob)
//   //falta hacer que suba el archivo, solo parece subir la informacion del parametro name
  
//   const stream = file.createWriteStream({
//     metadata: {
//       contentType: file.mimetype,
//     },
//     resumable: false
//   })

//   stream.on("error", (e)=> {
//     console.log(e)
//   })

//   stream.on("finish", async ()=> {
//     await file.makePublic();    

//     URL = `https://storage.googleapis.com/${BUCKET}/${name}`
//   })
  
//   //stream.end(blob)
//   stream.end(fileParam)
//   return { url: URL}
// }

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


// function uploadFirebase(fileParam) {
//   //const blob = convertFileOfBlob(fileParam)
//   //console.log("En firestores Blob: ", blob)
//   // const bucket = getStorage().bucket();
//   //console.log(fileParam.filename)
//   const localReadStream = fs.createReadStream(fileParam);
//   const name = fileParam.filename
//   const file = bucket.file(name)
//   //const file = bucket.file(blob)
//   //falta hacer que suba el archivo, solo parece subir la informacion del parametro name
  
//   const stream = file.createWriteStream({
//     metadata: {
//       contentType: file.mimetype,
//     },
//     resumable: false
//   })

//   localReadStream.pipe(stream)

//   stream.on("error", (e)=> {
//     console.log(e)
//   })

//   stream.on("finish", async ()=> {
//     await file.makePublic();    

//     URL = `https://storage.googleapis.com/${BUCKET}/${name}`
//   })
  
//   //stream.end(blob)
//   stream.end(fileParam)
//   return { url: URL}
// }

async function uploadFirebase(fileParam) {
  let storageRef = bucket.ref().child("pruebaUpload")
  //let storageRef = ref().child("pruebaUpload")
  await storageRef.put(fileParam)

  return storageRef
}



module.exports = {
    //database: db,
    //storage: storage,
    uploadFirebase: uploadFirebase
};
