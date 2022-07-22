const { credentialFirebase } = require("../../config/config")
const { initializeApp } = require("firebase/app")
const { ref, getStorage, uploadBytesResumable, getDownloadURL } = require("firebase/storage")
const { Buffer, Blob } = require("node:buffer");
const fs = require("fs")
//const { Storage } = require("@google-cloud/storage")

const firebaseConfig = {
  // apiKey: credentialFirebase.private_key_id,
  // authDomain: credentialFirebase.auth_provider_x509_cert_url,
  // databaseURL: credentialFirebase.project_id,
  storageBucket: 'backend-cursos-cecati13.appspot.com',
  credentialFirebase
};
const firebaseApp = initializeApp(firebaseConfig);

function convertFileOfBlob(file){  
  const buffer = fs.createReadStream(file)
  const blob = fs.createWriteStream(file).write()

  blob.on("data", chunk => console.log(chunk))
  //const blob = new Blob([file])
  console.log("blob", blob)
  return blob
}

async function uploadStorage(file){
  try {
    console.log("file en uploadStorage: ", file)
    const storage = getStorage(firebaseApp)
    //const storageRef = getInstance.reference().child("comprobantes/file.jpg");
    const storageRef = ref(storage, "prueba" )
    //storageRef.child("file.jpg");
    //console.log("storageRef: ", storageRef)
    const metadata = {
      //cacheControl: 'public,max-age=800',
      contentType: 'image/jpeg'
    };
  
    const blob = convertFileOfBlob(file)    

    //el archivo se recibe en Firebase, pero falta poder convertirlo al formato adecuado en un blob o buffer
    uploadBytesResumable(storageRef, blob, metadata)
     .then( snapshot => {
        console.log("Uploaded", snapshot.totalBytes, 'bytes.');
        console.log('File metadata:', snapshot.metadata);
        // Let's get a download URL for the file.
        getDownloadURL(snapshot.ref).then((url) => {
        console.log('File available at', url);
        })        
     }) 
    

    // const metadata = {
    //   contentType: 'image/jpeg',
    // };
    
    //console.log(storageRef)  
    //  uploadBytes(storageRef, file).then( snap => {
    //   console.log("upload File a Firebase")
    //  }) 
    
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