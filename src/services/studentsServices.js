const { postSpreedSheat, getSpreedSheat } = require("../utils/libs/spreedsheet");
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

    async dataRegister(body){
        console.log("que tiene el body: ", body)
    }

    async addRegistration(obj){
        const addressState = obj.estado[1];
        obj.estado = addressState;        
        const newObj = {
            ...obj,            
            sheet: sheetNumberControl,
        }
        //*prueba a Firestore */
        //en Firestore solo guardar la coleccion de
        //*prueba a Firestore */
       
        //guardamos matricula y fecha de registro
        await postSpreedSheat(newObj);
        newObj.sheet = sheetDatabase,
        //guardamos en database
        await postSpreedSheat(newObj);
        newObj.sheet = sheetInscriptions;
        //guardamos en preinscripciones
        await postSpreedSheat(newObj);
        const sucessfulyRegister = this.verifyLastRegistration(obj)        
       //sucessfulyRegister indica si se hizo el registro en SpreedSheet       
        return sucessfulyRegister;
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

    async recordInformation(obj) {
        const newObj = {
            ...obj,            
            sheet: sheetDatabase,
        }
        await postSpreedSheat(newObj);
        newObj.sheet = sheetNumberControl;
    }    
}

module.exports = Students;