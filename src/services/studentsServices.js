const { postSpreedSheet, getSpreedSheet, updateSpreedSheet } = require("../libs/spreedsheet");
const { sheetDatabase, sheetInscriptions, sheetNumberControl } = require("../models/namesSheet");
const { JSONResponse, JSONgetDB } = require("../models/JSONResponse");
const { generateCURP } = require("../middlewares/validateCURP")
const CURP = require("curp");
const { datetime } = require("../utils/date");

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
        if (createCURP === userCURP) {
            objReturn = {
                curp: obj.curp,
                nombre: obj.nombre,
                a_paterno: obj.a_paterno,
                a_materno: obj.a_materno,
                placeofBirth: obj.estado,
                gender: obj.genero,
                disability: obj.disability,
                birthdate: obj.fechaNacimiento,            
                actaNacimientoRender: obj.actaNacimientoRender
            };            
        } else {
            objReturn = {curp : false}
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
            const updated = await this.updateDBStudent(body);
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
}

module.exports = Students;