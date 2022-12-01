const bcrypt = require("bcrypt");
const { database } = require("../database/firestore");
const { getBlobStorage } = require("../controller/blobsAzure")
const path = require("path");
const fs = require("fs");
const collection = "usuarios";

class ControlStudentsService {
    constructor(){}

    async create (username, password){
        const hash = await bcrypt.hash(password, 9);
        const newUser = {
            username: username,
            password: hash
        };
        await database.collection(collection).add(newUser);
        return {
            username: username,
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
            if (document.username === username) {
                user.push(document);                
            }            
        });
        if (user[0]) {
            const verify = this.verifyPassword(password, user[0].password);
            return verify;
        } else {
            return false;
        }
    }

    async verifyPassword(password, hash){
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }

    async getFileBlob(body) {
        const filename = `${body.curp.toUpperCase()}-${body.typeDocument}.${body.extension}`;
        const fileBase64 = await getBlobStorage(filename);
        return {file: fileBase64}
    }
}

module.exports = ControlStudentsService;