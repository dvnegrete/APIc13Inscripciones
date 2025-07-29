import { notFound } from "@hapi/boom";
import {
  listBlobs,
  getBlobStorage,
  uploadBlobStorage,
  deleteBlob,
  deleteAllBlobsInContainer,
} from "../libs/blobsAzure.js";

export const listBlobsService = async (container) => {
  const objInformationBlob = {
    container: container,
  };
  const list = await listBlobs(objInformationBlob);
  return list;
};

export const findBlobUser = (arrayList, user) => {
  const arrayFilesforUser = arrayList.filter((obj) => {
    //example obj.name in format: NNNN0000NNNNNN00-actaNacimiento.pdf
    const arrayFileName = obj.name.split("-");
    if (arrayFileName[0] === user) {
      return obj;
    }
  });
  if (arrayFilesforUser.length === 0) {
    throw new Error(notFound());
  }
  return arrayFilesforUser;
};

/**
 *
 * @param {string} filename
 * @param {string} containerName
 * @returns {Object} -{ file: fileBase64 }
 */
export const getFileBlob = async (filename, containerName) => {
  const objInformationBlob = {
    name: filename,
    container: containerName,
  };
  const fileBase64 = await getBlobStorage(objInformationBlob);
  return { file: fileBase64 };
};

/**
 *
 * @param {string} filename
 * @param {string} containerName
 * @returns {boolean}
 */
export const deleteFileBlob = async (filename, containerName) => {
  const objInformationBlob = {
    name: filename,
    container: containerName,
  };
  const { succeeded } = await deleteBlob(objInformationBlob);
  return succeeded;
};

/**
 *
 * @param {Files[]} arrayFiles
 * @param {string} containerName
 * @returns {string[]}
 */
export const uploadFiPdf = async (arrayFiles, containerName) => {
  const arrayURLs = [];
  for (const file of arrayFiles) {
    const name = file.originalname;
    const objInformationBlob = {
      file: file,
      name: name,
      container: containerName,
    };
    const azureUpload = await uploadBlobStorage(objInformationBlob);
    arrayURLs.push(azureUpload);
  }
  return arrayURLs;
};

/**
 * Elimina todos los blobs de un contenedor sin eliminar el contenedor
 * @param {string} containerName - Nombre del contenedor
 * @returns {Object} - Resultado de la operación de eliminación
 */
export const deleteAllBlobsInContainerService = async (containerName) => {
  const objInformationBlob = {
    container: containerName,
  };
  const result = await deleteAllBlobsInContainer(objInformationBlob);
  return result;
};
