const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const { database } = require("../database/firestore");
const { getBlobStorage, uploadBlobStorage } = require("../controller/blobsAzure");
const collection = "usuarios";

class ControlStudentsService {
    constructor(){}

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
            throw boom.unauthorized();
        }
    }

    async verifyPassword(password, hash){
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }

    async getFileBlob(body) {
        const filename = `${body.curp.toUpperCase()}-${body.typeDocument}.${body.extension}`;
        const objInformationBlob = {
            name: filename,
            container: "comprobantes"
        };
        const fileBase64 = await getBlobStorage(filename);
        return {file: fileBase64}
    }

    async uploadFiPdf (file) {
        const name = file.originalname;        
        const objInformationBlob = {
            file: file,
            name: name,
            container: "informacion"
        };
        const azureUpload = await uploadBlobStorage(objInformationBlob);
         console.log("azureUpload", azureUpload)
        // if (azureUpload) {
        //     const azureGet = getBlobStorage(name);            
        // } else {
        //     console.error("no se pudo subir archivo")
        // }
        return { message: azureUpload }
    }
}

module.exports = ControlStudentsService;