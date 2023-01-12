const { postSpreedSheet, getSpreedSheet, updateSpreedSheet } = require("../libs/spreedsheet");
const { sheetDatabase, sheetInscriptions, sheetNumberControl } = require("../models/namesSheet");
const { gender } = require("../models/sheetGoogle/databaseModel");
const { JSONResponse, JSONgetDB } = require("../models/JSONResponse");
const { generateCURP, compareDigitVerifyCurp, messageDuplicity, messageErrorCurp } = require("../middlewares/validateCURP")
const CURP = require("curp");
const { datetime } = require("../utils/date");
// const { uploadStorage } =require("../database/firebaseStorage")
// const { uploadFirebase } = require("../database/firestore")
const { uploadBlobStorage, getBlobStorage } = require("../controller/blobsAzure");

//Conexion a Firestore
//const { database } = require("../database/firestore")

class Students {
    constructor(){}

    async findTypeRegister(stringCurp){
        let objReturn = {};
        if (CURP.validar(stringCurp)) {
            objReturn = await this.findForCurp(stringCurp);            
        }
        else {
            objReturn= { message: "Wrong Structure"};
        }
        return objReturn;
    }

    isCURPValidate(obj) {
        const createCURP = generateCURP(obj);
        const userCURP = obj.curp;
        let objReturn = {};
        //ajustar en middlewares/validateCURP.js formatDate segun ambiente productivo
        if (createCURP === userCURP) {
            objReturn = {
                curp: obj.curp,
                nombre: obj.nombre,
                a_paterno: obj.a_paterno,
                a_materno: obj.a_materno,
                placeofBirth: obj.estado,
                gender: gender(obj.genero),
                disability: obj.disability,
                birthdate: obj.fechaNacimiento,            
                actaNacimientoRender: obj.actaNacimientoRender
            };            
        } else {
            const compareCURP = compareDigitVerifyCurp(userCURP, createCURP);
            if (compareCURP) {
                objReturn = {curp: false, datacurp: createCURP, message: messageDuplicity}
            } else {
                objReturn = {curp : false, datacurp: createCURP, message: messageErrorCurp}
            }
        }
        return objReturn
    }

    async toCompleteInformationBody(body) {
        const controlNumber = await this.generateNumberControl();
        const dataCompleted = {
            ...body,
            fechaRegistro: datetime(),
            matricula: controlNumber,
        };
        return dataCompleted;
    }

    async generateNumberControl() {
        const rows = await getSpreedSheet(sheetNumberControl);
        const countRows = rows.length;
        const numberControl = rows[countRows-1].matricula;
        const numberGenerate =  parseInt(numberControl, 10) + 1;
        return numberGenerate;
    }

    async findForCurp(stringCURP){
        const rows = await getSpreedSheet(sheetDatabase);
        const data = rows.filter( column => {
            const value = column.curp.toUpperCase();
            return value.includes(stringCURP)
        })
        let objReturn = {};
        if (data.length > 0) {
            objReturn = JSONResponse(data);
        } else {
            objReturn = { error: "CURP"}
        }
        return objReturn;
    }

    async getDataDB(stringCURP){
        const rows = await getSpreedSheet(sheetDatabase);
        const data = rows.filter( column => {
            const value = column.curp.toUpperCase();
            return value.includes(stringCURP)            
        });        
        const info = JSONgetDB(data);
        return info;        
    }

    async addInscriptionNewStudent(obj){
        // const addressState = obj.estado[1];
        // obj.estado = addressState;
        //*prueba a Firestore */
        //en Firestore solo guardar la coleccion de
        //*prueba a Firestore */
        this.dbSaveNumberControl(obj);
        this.dbSaveRegister(obj);
        const sucessfullyRegister = this.inscription(obj);
        return sucessfullyRegister;
    }

    //guardamos matricula y fecha de registro
    async dbSaveNumberControl(obj) {
        const newObj = this.insertSheet(obj, sheetNumberControl)
        await postSpreedSheet(newObj);
    }

    //guardamos en database
    async dbSaveRegister(obj) {
        const newObj = this.insertSheet(obj, sheetDatabase)
        await postSpreedSheet(newObj);
    }

    //guardamos en preinscripciones
    async inscription(obj) {
        const newObj = this.insertSheet(obj, sheetInscriptions);
        await postSpreedSheet(newObj);
        //sucessfulyRegister indica si se hizo el registro en SpreedSheet
        const sucessfullyRegister = this.verifyLastRegistration(obj);
        return sucessfullyRegister;
    }

    insertSheet(obj, nameSheet){
        const newObj = {
            ...obj,
            sheet: nameSheet,
        }
        return newObj;
    }

    //consultar que ultimo registro en Spreedsheets sea el mismo que registramos
    async verifyLastRegistration(obj) {
        const rows = await getSpreedSheet(sheetInscriptions);
        const countRows = rows.length;
        const lastInscriptionCurp = rows[countRows-1].curp;
        let verify = false;
        if (lastInscriptionCurp === obj.curp){
            verify = true;
        }
        const res = {
            status : verify,
            matricula: obj.matricula,
            fechaRegistro: obj.fechaRegistro
        }
        return res;
    }

    async addInscriptionDBStudent(body) {
        if (body.update) {
            const bodyWithDatetime = { 
                ...body, 
                fechaRegistro: datetime() 
            };
            const updated = await this.updateDBStudent(bodyWithDatetime);
            //confirmamos que se actualizo la informacion
            body.update = updated.updated;
        }
        delete body.matricula;
        delete body.a_paterno;
        delete body.a_materno;
        delete body.nombre;
        delete body.telefono;
        delete body.email;
        //buscamos los datos en la BD
        const data = await this.getDataDB(body.curp);
        const newObj = { ...body, ...data };
        //Reassignmos timestampt  que viene del Registro de BD al actual
        const date = new Date();
        const timeStampt = datetime();
        newObj.fechaRegistro = timeStampt;
        //e inscribimos
        const sucessfullyRegister = await this.inscription(newObj);
        const res = {
            ...sucessfullyRegister,
            //indica si pudo realizarse actualizarse
            update: newObj.update
        }
        return res;
    }

    async updateDBStudent(obj) {
        const newObj = this.insertSheet(obj, sheetDatabase);
        const updated = await updateSpreedSheet(newObj);
        return {
            updated : updated
        }
    }

    async uploadStorageDocs (files, curp) {
        let arrayURLs = [];
        if (files.actaNacimiento) {
            const url = await this.uploadFile(files.actaNacimiento, curp);
            arrayURLs.push(url);
        }
        if (files.comprobanteDomicilio) {
            const url = await this.uploadFile(files.comprobanteDomicilio, curp);
            arrayURLs.push(url);
        }
        if (files.comprobanteEstudios) {
            const url = await this.uploadFile(files.comprobanteEstudios, curp);
            arrayURLs.push(url);
        }
        const URLs = {};
        arrayURLs.forEach( element => {
            const arrayKey = Object.keys(element);
            const key = arrayKey[0];
            Object.defineProperty(URLs, key, {
                value: element[key],
                writable: true,
                enumerable: true,
                configurable: true
            });
        })        
        return URLs;
    }
    
    async uploadFile (file, curp) {
        const name = file[0].fieldname;
        const ext = file[0].mimetype.split("/")[1];
        const nameFile = `${curp}-${file[0].fieldname}.${ext}`;
        const url =  {}
        Object.defineProperty( url, name, {
            value: nameFile,
            enumerable: true,
            writable: true,
            configurable: true
        });
        const objInformationBlob = {
            file: file[0],
            name: nameFile,
            container: "comprobantes"
        };
        const azureUpload = await uploadBlobStorage(objInformationBlob);
        // console.log("azureUpload", azureUpload)
        // if (azureUpload) {
        //     const azureGet = getBlobStorage(name);            
        // } else {
        //     console.error("no se pudo subir archivo")
        // }
        return url
    }
}

module.exports = Students;