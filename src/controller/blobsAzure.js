const { BlobServiceClient } = require("@azure/storage-blob");
const { azureStorageConnection } = require("../../config")
const boom = require("@hapi/boom");

const blobServices= BlobServiceClient.fromConnectionString(azureStorageConnection);

async function uploadBlobStorage (obj) {
    //obj = file, name, container
    try {
        const { buffer } = obj.file;
        const containerClient = blobServices.getContainerClient(obj.container);
        await containerClient.getBlockBlobClient(obj.name).uploadData(buffer);
        const blockBlobClient = containerClient.getBlockBlobClient(obj.name);        
        return blockBlobClient.url;
    } catch (error) {
        console.error(error.message);
        return { "message": error.message }
    }
}

//const container = "comprobantes";

async function getBlobStorage (obj) {
    try {
        const containerClient = blobServices.getContainerClient(obj.container);
        const blockBlobClient = containerClient.getBlockBlobClient(obj.name);
        const downloadBlockBlobResponse = await blockBlobClient.download();
        const downloaded = (
          await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
        );        
        return downloaded;
    } catch (error) {
        throw boom.notFound(error);
    }
}

async function deleteBlob (obj){
    const containerClient = blobServices.getContainerClient(obj.container);
        const fileBlob = await containerClient.getBlockBlobClient(obj.name).deleteIfExists();
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