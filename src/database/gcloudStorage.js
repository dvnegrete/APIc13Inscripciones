const { credentialFirebase, credentialGoogle, apiKey } = require("../../config")
const { Storage } = require("@google-cloud/storage");

//const auth = new GoogleAuth({
  //keyFile: credentialGoogle,
  //scopes: ['https://www.googleapis.com/auth/cloud-platform']
  //scopes: ["https://backend-cursos-cecati13.appspot.com"]
//})
 const projectId ="backend-cursos-cecati13"  
// const keyFilename = credentialGoogle
const BUCKET = 'backend-cursos-cecati13.appspot.com';
const configGCloud = {  
  // credentials: {
  //   client_email: credentialGoogle.client_email,
  //   private_key: credentialGoogle.private_key
  //  },
  keyFilename:credentialGoogle,
  //keyFilename: JSON.stringify(credentialGoogle),
  //projectId: "backend-cursos-cecati13" 
  //projectId, keyFilename
};


function convertFileOfBlob(file){
  const blob = new Blob([file])  
  return blob
}

async function uploadStorage(file){
  try {
    
    
    
    
    //console.log(configGCloud)
    //console.log(configGCloud)
    //const storage = new Storage(configGCloud)
    const storage = new Storage()
    
    const [hmacKey, secret] = await storage.createHmacKey(credentialGoogle.client_email, {
      projectId: projectId,
    });
  
    console.log(`The base64 encoded secret is: ${secret}`);
    console.log('Do not miss that secret, there is no API to recover it.');
    console.log('The HMAC key metadata is:');
    for (const [key, value] of Object.entries(hmacKey.metadata)) {
      console.log(`${key}: ${value}`);
    }

    //const bucket = storage.bucket(BUCKET)
    // const [buckets] = await storage.getBuckets();

    // console.log('Buckets:');
    // buckets.forEach(bucket => {
    //   console.log(bucket.name);
    // });

    const name = file.fieldname
    //console.log("file name: ", name)
    // const blob = bucket.file(file)
    // const blobStream = blob.createWriteStream();    

    // blobStream.on("error", e => {
    //   console.log(e)
    // })

    // blobStream.on("finish", ()=>{
    //   const publicUrl = format(
    //     URL =`https://storage.googleapis.com/${bucket.name}/${blob.name}`
    //   )
    // })

    // blobStream.end()
    // return { url: URL }

  } catch (error) {
    console.log(error)
    console.log("Error en GcloudStogare Catch")
  }
}

module.exports = {
    uploadStorage: uploadStorage
}