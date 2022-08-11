const { postSpreedSheat, getSpreedSheat } = require("../utils/libs/spreedsheet");
const { sheetCurpNumberControl, sheetInscriptions } = require("../models/namesSheet");
const JSONResponse = require("../models/JSONResponse");
const { generateCURP } = require("../middlewares/validateCURP")

const storageCloud = require("../models/storageCloud")
//const { uploadFirebase } = require("../database/firestore")
const { uploadStorage } = require("../database/firebaseStorage")
//const { uploadStorage } = require("../database/gcloudStorage")

class Students {
    nameSheetInscriptions = sheetInscriptions;
    sheet = sheetCurpNumberControl;
    constructor(){}

    isCURPValidate(obj) {
        const createCURP = generateCURP(obj);
        const userCURP = obj.curp;
        let responseValidateCurp = false;
        if (createCURP === userCURP) {
            responseValidateCurp = true;
            console.log("CURP VALIDADA, continuar inscripcion")
        }
        return responseValidateCurp
    }

    async findForCurp(stringCURP){
        const rows = await getSpreedSheat(this.sheet);
        const data = rows.filter( column => {
            return column.curp.includes(stringCURP)
        })
        if (data.length > 0) {
            const info = JSONResponse(data);
            return info;            
        } else {
            const notFound = { error: "CURP"}
            return notFound;
        }
    }

    async dataRegister(body){
        console.log("que tiene el body: ", body)
    }

    async addRegistration(obj){
        const addressState = obj.estado[1];
        obj.estado = addressState;
        console.log(obj)
        // obj.estado = "Estado Harcodeado";
        // obj.telefono = "5523124 Harcodeado"
        const newObj = {
            ...obj,            
            sheet: this.nameSheetInscriptions,
        }
        //*prueba a Firestore */
        //en Firestore solo guardar la coleccion de
        //*prueba a Firestore */

       
        const sheet = await postSpreedSheat(newObj);
        console.log(sheet)       
       
        return newObj;
    }

    async uploadStorage(files, body){
//        console.log(files.actaNacimiento)
        //referencia al bucket donde estara el archivo
        //const fileNacimiento = files.actaNacimiento[0]
        //fileNacimiento.originalname = body.curp + "-" + files.actaNacimiento[0].originalname
        //console.log(fileNacimiento)
        //const uploadNacimiento = uploadFirebase(fileNacimiento)        
    
        console.log("por el momento simulamos subida a Storage de archivos adjuntos")
        //uploadStorage(fileNacimiento)
        
        //const nameDomicilio = body.curp + "-" + files.comprobanteDomicilio[0].originalname
        //const fileDomicilio = files.comprobanteDomicilio[0]
        //const uploadDomicilio = uploadFirebase(nameDomicilio, fileDomicilio)
        
        //const nameEstudios = body.curp + "-" + files.comprobanteEstudios[0].originalname
        //const fileEstudios =files.comprobanteEstudios[0]
        //const uploadEstudios = uploadFirebase(nameEstudios,fileEstudios)        
    }
}

module.exports = Students;