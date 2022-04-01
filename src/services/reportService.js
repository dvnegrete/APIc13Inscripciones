const { getSpreedSheat } = require("../spreedsheet");
    
class Report {
    constructor(){
    }

    async getInfo() {
        const sheet = await getSpreedSheat("inscripciones");
        const rows = await sheet.getRows();
        const data = [];
        //forma para  pedir info => rows[0].campo
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
        const sheet = await getSpreedSheat("inscripciones");
        const rows = await sheet.getRows();
        const countRows = rows.length
        return countRows;
    }
    
    async getCURP(){
        const sheet = await getSpreedSheat("inscripciones");
        const rows = await sheet.getRows()
        const data = [];
        rows.forEach(column => {
            data.push(column.curp)
        });
        return data;
    }    
}

module.exports = Report;