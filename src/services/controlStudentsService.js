import bcrypt from "bcrypt";
import { notFound, unauthorized } from "@hapi/boom";
import { database } from "./../database/firestore.js";
import { listBlobs, getBlobStorage, uploadBlobStorage } from "./../libs/blobsAzure.js";
const collection = "usuarios";

export default class ControlStudentsService {
    constructor(){}

    // Métodos de Authenticación local
    async create (username, password) {
        const hash = await bcrypt.hash(password, 9);
        const snapshot = await database.collection(collection).count().get();
        const id = snapshot.data().count + 1;
        const newUser = {
            id: id,
            username: username.toUpperCase(),
            password: hash,
            role: "user"
        };
        await database.collection(collection).add(newUser);
        return {
            username: username,
            id: id,
            message:"Usuario creado",
            status: true
        }
    }

    async checkAccess (username, password) {
        const consult = database.collection(collection);
        const snapshot = await consult.get();
        const user = [];
        snapshot.forEach( doc => {
            const document = doc.data();
            if (document.username === username.toUpperCase()) {
                user.push(document);
            }
        });
        if (user[0]) {
            const verify = await this.verifyPassword(password, user[0].password);
            const id = verify ? user[0].id : false;
            const json = {
                id: id,
                role: user[0].role
            }            
            return json;
        } else {
            throw unauthorized();
        }
    }

    async verifyPassword(password, hash){
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
    // Métodos de Authenticación local
    

    async listBlobs (container) {
        const objInformationBlob = {
            container: container
        };
        const list = await listBlobs(objInformationBlob);
        return list;
    }

    findBlobUser(arrayList, user){
        const arrayFilesforUser  = arrayList.filter( obj => {
            //example obj.name in format: NNNN0000NNNNNN00-actaNacimiento.pdf
            const arrayFileName = obj.name.split("-");
            if (arrayFileName[0] === user) {
                return obj;
            }            
        })
        if (arrayFilesforUser.length === 0) {
            throw new Error(notFound)
        }
        return arrayFilesforUser;
    }

    async getFileBlob(filename) {
        const objInformationBlob = {
            name: filename,
            container: "comprobantes"
        };
        const fileBase64 = await getBlobStorage(objInformationBlob);
        return {file: fileBase64}
    }

    async uploadFiPdf (arrayFiles) {
        const arrayURLs = [];
        for (const file of arrayFiles) {
            const name = file.originalname;
            const objInformationBlob = {
                file: file,
                name: name,
                container: "informacion"
            };
            const azureUpload = await uploadBlobStorage(objInformationBlob);
            arrayURLs.push(azureUpload);
        }        
        // if (azureUpload) {
            //     const azureGet = getBlobStorage(name);
            // } else {
                //     console.error("no se pudo subir archivo")
                // }        
        return arrayURLs
    }
}