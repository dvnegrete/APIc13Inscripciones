const { conexionGoogleSheet } = require("../spreedsheet");

// const reportService = async () => {
    //     //const register = report.curp;    
    //     const rows = await sheet.getRows()
    //     console.log(rows.length)
    //     //return report
    // }
    
class Report {
    constructor(){}
    
    async countBD(){
        const sheet = await conexionGoogleSheet();
        const countRows = await sheet.getRows().length
        return countRows;
    }
    
    async getCURP(){
        const sheet = await conexionGoogleSheet();
        const rows = await sheet.getRows()
        rows.forEach(element => {
            console.log(element.curp)            
        });
}

}

module.exports = Report;