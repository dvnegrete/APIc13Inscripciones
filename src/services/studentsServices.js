const { postSpreedSheat, getSpreedSheat } = require("../utils/libs/spreedsheet");
const { sheetCurpNumberControl } = require("../models/namesSheet");
const JSONResponse = require("../models/JSONResponse");
const { generateCURP } =require("../middlewares/validateCURP")

class Students {
    sheet = sheetCurpNumberControl;
    constructor(){}

    isCURPValidate(obj) {
        const createCURP = generateCURP(obj);
        console.log("createCURP", createCURP)
        const userCURP = obj.curp;
        console.log("userCURP", userCURP)
        if (createCURP === userCURP) {
            console.log("CURP VALIDADA, continuar inscripcion")
        } else {
            console.log("Error. Datos no validos en CURP")
        }
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

    async findForControlNumber(StringNumber){
        const rows = await getSpreedSheat(this.sheet);
        const data = rows.filter(column => {
            return column.matricula === StringNumber
        })
        if (data.length > 0) {
            const info = JSONResponse(data);        
            return info;            
        } else {
            const notFound = { error: "MATRICULA"}            
            return notFound;
        }        
    }        
}

module.exports = Students;