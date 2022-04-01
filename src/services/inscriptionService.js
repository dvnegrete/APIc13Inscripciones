const { postSpreedSheat, getSpreedSheat } = require("../spreedsheet");
const curp = require("curp")

class Inscriptions {
    constructor(){}   

    async addRegistration(obj){        
        const CURP = await this.validateCURP(obj.curp);        
        if (CURP) {
            const sheet = await postSpreedSheat(obj);
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
        const sheet = await getSpreedSheat("inscripciones");
        const rows = await sheet.getRows();
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