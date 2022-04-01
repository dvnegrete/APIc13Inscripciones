const { postSpreedSheat, getSpreedSheat } = require("../spreedsheet");

class Students {
    constructor(){}

    async findForCurp(stringCURP){
        const sheet = await getSpreedSheat("matricula");
        const rows = await sheet.getRows();        
        const data = rows.filter( column => {
            return column.curp.includes(stringCURP)
        })
        const info = {
            curp: data[0].curp,
            matricula: data[0].matricula,
            a_paterno: data[0].a_paterno,
            a_materno: data[0].a_materno,
            nombre: data[0].nombre,
        }        
        return info;
    }

    async findForControlNumber(StringNumber){        
        const sheet = await getSpreedSheat("matricula");
        const rows = await sheet.getRows();
        const data = rows.filter( column => {
            return column.matricula.includes(StringNumber)
        })
        const info = {
            curp: data[0].curp,
            matricula: data[0].matricula,
            a_paterno: data[0].a_paterno,
            a_materno: data[0].a_materno,
            nombre: data[0].nombre,
        }        
        return info;
        
    }    
}

module.exports = Students;