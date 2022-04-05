const { postSpreedSheat, getSpreedSheat } = require("../utils/libs/spreedsheet");
const curp = require("curp");
const nameSheet = require("../models/namesSheet");


class Inscriptions {
    sheet = nameSheet.sheetInscriptions;

    constructor(){}   

    async addRegistration(obj){        
        const CURP = await this.validateCURP(obj.curp);
        if (CURP) {
            const newObj = {
                ...obj,
                sheet: this.sheet
            }
            const sheet = await postSpreedSheat(newObj);
            const result = this.lastRegistration();
            return result
        } else {
            const objInscription= {
                matricula: "Tu CURP es invalida, revisa la información"
            }
            return objInscription;   
        }
    }

    async lastRegistration() {        
        const rows = await getSpreedSheat(this.sheet);        
        const countRows = rows.length        
        const lastInscription = rows[countRows-1].matricula;        
        const objInscription= {
            matricula: lastInscription
        };
        return objInscription;
    }

    async validateCURP(string){
        const CURP = curp.validar(string)        
        return CURP
    }
    
}

module.exports = Inscriptions;