import { notFound } from "@hapi/boom";
import {
  listBlobs,
  getBlobStorage,
  uploadBlobStorage,
  deleteBlob,
} from "./../libs/blobsAzure.js";
export default class ControlStudentsService {
  constructor() {}

  async listBlobs(container) {
    const objInformationBlob = {
      container: container,
    };
    const list = await listBlobs(objInformationBlob);
    return list;
  }

  findBlobUser(arrayList, user) {
    const arrayFilesforUser = arrayList.filter((obj) => {
      //example obj.name in format: NNNN0000NNNNNN00-actaNacimiento.pdf
      const arrayFileName = obj.name.split("-");
      if (arrayFileName[0] === user) {
        return obj;
      }
    });
    if (arrayFilesforUser.length === 0) {
      throw new Error(notFound);
    }
    return arrayFilesforUser;
  }

  async getFileBlob(filename) {
    const objInformationBlob = {
      name: filename,
      container: "comprobantes",
    };
    const fileBase64 = await getBlobStorage(objInformationBlob);
    return { file: fileBase64 };
  }

  async deleteFileBlob(filename) {
    const objInformationBlob = {
      name: filename,
      container: "comprobantes",
    };
    const { succeeded } = await deleteBlob(objInformationBlob);
    return succeeded;
  }

  async uploadFiPdf(arrayFiles) {
    const arrayURLs = [];
    for (const file of arrayFiles) {
      const name = file.originalname;
      const objInformationBlob = {
        file: file,
        name: name,
        container: "informacion",
      };
      const azureUpload = await uploadBlobStorage(objInformationBlob);
      arrayURLs.push(azureUpload);
    }
    // if (azureUpload) {
    //     const azureGet = getBlobStorage(name);
    // } else {
    //     console.error("no se pudo subir archivo")
    // }
    return arrayURLs;
  }
}
