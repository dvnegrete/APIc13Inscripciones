const { getSpreedSheat } = require("../utils/libs/spreedsheet");
const sheetGoogle = "registro_inscripciones";

class Report {
    constructor(){
    }

    async getInfo() {
        const rows = await getSpreedSheat(sheetGoogle);      
        const data = [];
        //forma para  pedir info => rows[0].campo
        //falta definir los models segun la hoja que este trabajando
        rows.forEach(column => {
            const register = {
                matricula: column.matricula,
                curp: column.curp,
                email: column.email,
                alumno: column.a_paterno + " " + 
                        column.a_materno + " " +
                        column.nombre,
                curso: column.curso
            }
            data.push(register);
        });
        return data;
    }
    
    async countBD(){
        const sheet = await getSpreedSheat(sheetGoogle);
        const rows = await sheet.getRows();
        const countRows = rows.length
        return countRows;
    }
    
    async getCURP(){
        const sheet = await getSpreedSheat(sheetGoogle);
        const rows = await sheet.getRows()
        const data = [];
        rows.forEach(column => {
            data.push(column.curp)
        });
        return data;
    }    
}

module.exports = Report;