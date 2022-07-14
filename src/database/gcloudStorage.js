const { credentialFirebase, credentialGoogle } = require("../../config/config")
const { Storage } = require("@google-cloud/storage");

const BUCKET = 'comprobantes';
const configGCloud = {
  keyFileName: credentialFirebase,
  projectId: "backend-cursos-cecati13"
};


function convertFileOfBlob(file){
  const blob = new Blob([file])  
  return blob
}

async function uploadStorage(file){
  try {
    console.log(configGCloud)
    const storage = new Storage(configGCloud)
    
    const bucket = storage.bucket(BUCKET)
    // const [buckets] = await storage.getBuckets();

    // console.log('Buckets:');
    // buckets.forEach(bucket => {
    //   console.log(bucket.name);
    // });

    const name = file.fieldname
    console.log("file name: ", name)
    const blob = bucket.file(file)
    const blobStream = blob.createWriteStream();

    blobStream.on("error", e => {
      console.log(e)
    })

    blobStream.on("finish", ()=>{
      const publicUrl = format(
        URL =`https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )
    })

    blobStream.end()
    return { url: URL }

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    uploadStorage: uploadStorage
}