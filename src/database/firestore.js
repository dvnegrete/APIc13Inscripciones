const { credentialGoogle, credentialFirebase } = require("../../config")
//const { initializeApp, cert } = require("firebase-admin/app");
const admin = require("firebase-admin");
const { getAuth, Auth, BaseAuth} = require("firebase-admin/auth");
//const { getApp, initializeApp } = require("firebase/app")
//const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore")
//const { ref, getStorage, uploadBytes } = require("firebase/storage")
const { getStorage } = require("firebase-admin/storage")
const { Blob } = require("node:buffer");
const fs = require('fs');
const { firebase } = require("googleapis/build/src/apis/firebase");

//const uploadStorage  = require("./firebaseStorage")
const firebaseConfig = {
  ...credentialFirebase,
}

const BUCKET = "backend-cursos-cecati13.appspot.com"
const URL = "https://backend-cursos-cecati13.firebaseapp.com/__/auth/handler"
const databaseURL = "https://backend-cursos-cecati13.firebaseio.com"


admin.initializeApp({
  credential : admin.credential.cert(credentialFirebase),
  //storageBucket: BUCKET,
  databaseURL : databaseURL
})

async function uploadFirebase(file) {
  
  const bucket = admin.storage().bucket();
  let URL = "";
  const name = "subio!!";  
  console.log(file)
  const fileUbication = bucket.file("pruebaFirestore")

  const stream = fileUbication.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.on("error", (e) => {
    console.error(e);
  });

  stream.on("finish", async ()=> {
    await fileUbication.makePublic();
    URL = `https://storage.googleapis.com/${BUCKET}/${name}`;        
  });

  stream.end(file.buffer);
  return { url: URL}
}


const auth = getAuth()

function auhtMicrosoft (email, password) {
  
}







// const firebaseAPP = initializeApp({ 
//   credential: cert(credentialFirebase),
//   storageBucket: BUCKET
// });

function convertFileOfBlob(file){
  const blob = new Blob([file], { type: 'image/jpeg' })
  return blob
}
// const bucket = getStorage().bucket();
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
//   //const bucket = getStorage().bucket();
//   //console.log(fileParam.filename)
//   //const localReadStream = fs.createReadStream(fileParam);
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

// async function uploadFirebase(fileParam) {
//   let storageRef = bucket.ref().child("prueba")
//   //let storageRef = ref().child("pruebaUpload")
//   await storageRef.put(fileParam)

//   return storageRef
// }



module.exports = {
    //database: db,
    //storage: storage,
    uploadFirebase: uploadFirebase
};
