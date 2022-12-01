const { BlobServiceClient } = require("@azure/storage-blob");
const { azureStorageConnection } = require("../../config")

const blobServices= BlobServiceClient.fromConnectionString(azureStorageConnection);
const container = "comprobantes";

async function uploadBlobStorage (file, name) {
    try {
        const { buffer } = file;
        const containerClient = blobServices.getContainerClient(container);
        await containerClient.getBlockBlobClient(name).uploadData(buffer);
        await getBlobStorage(name);
        return true;
    } catch (error) {
        console.error(error.message);
        return { "message": error.message }
    }
}

async function getBlobStorage (name) {
    try {
        const containerClient = blobServices.getContainerClient(container);
        const blockBlobClient = containerClient.getBlockBlobClient(name);
        const downloadBlockBlobResponse = await blockBlobClient.download();
        const downloaded = (
          await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
        );        
        return downloaded;
    } catch (error) {
        console.error(error.message);
        return { "message": error.message }
    }
}

async function deleteBlob (name){
    const containerClient = blobServices.getContainerClient(container);
        const fileBlob = await containerClient.getBlockBlobClient(name).deleteIfExists();
        console.log(fileBlob)
        return fileBlob;
}


async function streamToBuffer(readable) {
    readable.setEncoding('base64');
    let data = '';
    for await (const chunk of readable) {
      data += chunk;
    }
    return data;
  }

module.exports = { uploadBlobStorage, getBlobStorage };