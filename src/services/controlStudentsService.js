const bcrypt = require("bcrypt");
const { database } = require("../database/firestore");
const { use } = require("../routes/controlStudentsRouter");

class ControlStudentsService {
    constructor(){}

    async create (username, password){
        const hash = await bcrypt.hash(password, 9);
        const newUser = {
            username: username,
            password: hash
        };
        await database.collection("usuarios").add(newUser);
        return {
            username: username,
            message:"Usuario creado",
            status: true
        }
    }

    async checkAccess (username, password) {
        console.log("checkAccess ")
        
        const consult = database.collection("usuarios");
        const snapshot = await consult.get();
        const user = [];
        snapshot.forEach( doc => {
            const document = doc.data();
            if (document.username === username) {
                user.push(document);                
            }            
        })        
        if (user[0]) {            
            const verify = this.verifyPassword(password, user[0].password)
            return verify;            
        } else {
            return false;
        }
    }

    async verifyPassword(password, hash){
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}

module.exports = ControlStudentsService;