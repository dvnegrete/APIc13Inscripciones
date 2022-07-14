const { credentialFirebase } = require("../../config/config")
const { initializeApp } = require("firebase/app")
const { ref, getStorage, uploadBytes } = require("firebase/storage")
const { Buffer } = require("node:buffer");
const { Storage } = require("@google-cloud/storage")

const firebaseConfig = {
  apiKey: credentialFirebase.private_key_id,
  authDomain: credentialFirebase.auth_provider_x509_cert_url,
  databaseURL: credentialFirebase.project_id,
  storageBucket: 'backend-cursos-cecati13.appspot.com'
};
const firebaseApp = initializeApp(firebaseConfig);

function convertFileOfBlob(file){
  const blob = new Buffer([file])
  //console.log(blob)
  return blob
}

async function uploadStorage(file){
  try {
    //console.log("file en uploadStorage: ", file)
    const storage = getStorage(firebaseApp)
    //const storageRef = getInstance.reference().child("comprobantes/file.jpg");
    const storageRef = ref(storage).child("comprobantes/file.jpg");
    // const metadata = {
    //   contentType: 'image/jpeg',
    // };
    //const blob = convertFileOfBlob(file)
    
    //console.log(storageRef)  
    uploadBytes(storageRef, file).then( snap => {
      console.log("upload File a Firebase")
     }) 
    
  } catch (error) {
    console.log(error)
  }
}

// async function uploadStorage(file){
//   try {
//    //console.log("file en uploadStorage: ", file)
//     const storage = getStorage(firebaseApp)
//     //const storageRef = getInstance.reference().child("comprobantes/file.jpg");
//     const storageRef = ref(storage)
//     // const metadata = {
//     //   contentType: 'image/jpeg',
//     // };
    
//     //console.log(storageRef)  
//     uploadBytes(storageRef, file).then( snap => {
//     console.log("upload File a Firebase")
//      })
//   } catch (error) {
//     console.log(error)
//   }
// }

module.exports = {
    uploadStorage: uploadStorage
}