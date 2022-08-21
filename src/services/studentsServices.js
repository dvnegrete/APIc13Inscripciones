const { postSpreedSheat, getSpreedSheat } = require("../libs/spreedsheet");
const { sheetDatabase, sheetInscriptions, sheetNumberControl } = require("../models/namesSheet");
const JSONResponse = require("../models/JSONResponse");
const { generateCURP } = require("../middlewares/validateCURP")
const { timeStampt } = require("../utils/date")

//Conexion a Firestore
//const { database } = require("../database/firestore")

class Students {
    // nameSheetInscriptions = sheetInscriptions;
    // sheetFindCurp = sheetDatabase;
    // sheetMatricula = sheetNumberControl;
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

    async toCompleteInformationBody(links, body) {
        const controlNumber = await this.generateNumberControl();        
        const dataCompleted = {
            ...body,
            fechaRegistro: timeStampt,
            matricula: controlNumber,
            acta_de_nacimiento : links.acta,
            comprobante_domicilio : links.domicilio,
            comprobante_estudios : links.estudios
        };
        return dataCompleted;        
    }

    async generateNumberControl() {
        const rows = await getSpreedSheat(sheetNumberControl);               
        const countRows = rows.length;
        const numberControl = rows[countRows-1].matricula;
        const numberGenerate =  parseInt(numberControl, 10) + 1;        
        return numberGenerate;
    }

    async findForCurp(stringCURP){
        const rows = await getSpreedSheat(sheetDatabase);
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

    async addInscriptionNewStudent(obj){
        const addressState = obj.estado[1];
        obj.estado = addressState;
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
        await postSpreedSheat(newObj);        
    }

    //guardamos en database
    async dbSaveRegister(obj) {
        const newObj = this.insertSheet(obj, sheetDatabase)        
        await postSpreedSheat(newObj);
    }

    //guardamos en preinscripciones
    async inscription(obj) {
        const newObj = this.insertSheet(obj, sheetInscriptions);
        await postSpreedSheat(newObj);
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

    async verifyLastRegistration(obj) {        
        const rows = await getSpreedSheat(sheetInscriptions);        
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
          const update = this.updateDBStudent(body);
          //campo update indica que se tiene que modificar la BD
        }
        const data = this.findForCurp(body.curp);
        const newObj = {
            ...body,
            ...data
        };
        const sucessfullyRegister = this.inscription(obj);
        return sucessfullyRegister;
    }

    async updateDBStudent(body) {
        //forma: body.update { contact : {}, address: {}, scholarship : {}}
        console.log("recibimos bandera indicando actualizacion de registros");
        const updateVerify = true;
        return updateVerify;
    }

    // async recordInformation(obj) {
    //     const newObj = {
    //         ...obj,            
    //         sheet: sheetDatabase,
    //     }
    //     await postSpreedSheat(newObj);
    //     newObj.sheet = sheetNumberControl;
    // }
}

module.exports = Students;