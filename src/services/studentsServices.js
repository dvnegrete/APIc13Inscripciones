const { postSpreedSheet, getSpreedSheet, updateSpreedSheet } = require("../libs/spreedsheet");
const { sheetDatabase, sheetInscriptions, sheetNumberControl } = require("../models/namesSheet");
const { JSONResponse, JSONgetDB } = require("../models/JSONResponse");
const { generateCURP } = require("../middlewares/validateCURP")
const MyDate = require("../utils/date");
const { da } = require("date-fns/locale");

//Conexion a Firestore
//const { database } = require("../database/firestore")

class Students {
    constructor(){}    

    isCURPValidate(obj) {
        const createCURP = generateCURP(obj);
        const userCURP = obj.curp;
        let responseValidateCurp = false;
        if (createCURP === userCURP) {
            responseValidateCurp = true;            
        }
        return responseValidateCurp
    }

    async toCompleteInformationBody(body) {
        const controlNumber = await this.generateNumberControl();
        const date = new Date();        
        const dataCompleted = {
            ...body,
            fechaRegistro: date.toLocaleString(),
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
        if (data.length > 0) {            
            const info = JSONResponse(data);
            return info;
        } else {
            const notFound = { error: "CURP"}
            return notFound;
        }
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
            //campo update indica que se tiene que modificar la BD
            const updated = await this.updateDBStudent(body);
            //confirmamos que se actualizo la informacion
            body.update = updated.updated;
        }
        //buscamos los datos en la BD        
        const data = await this.getDataDB(body.curp);
        const newObj = { ...body, ...data };
        //Reassignmos timestampt  que viene del Registro de BD al actual
        const date = new Date();
        const timeStampt = date.toLocaleString();
        newObj.fechaRegistro = timeStampt;
        //newObj.fechaRegistro = MyDate.timeStampt();
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
}

module.exports = Students;