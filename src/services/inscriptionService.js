import pkgCurp from "curp";
import { getSpreedSheet, postSpreedSheet } from "./../libs/spreedsheet.js";
import { datetime } from "./../utils/date.js";
import { nameSheet } from "./../models/namesSheet.js";
const students = "estudiantes";

import { database } from "./../database/firestore.js";
const collection = "";
export default class Inscriptions {
    
    sheet = nameSheet.sheetInscriptions;

    constructor(){}   

    async addRegisterDataBase(obj) {
        const newStudent = studentDocument(obj);
        if (obj.isStudent) {
            //si ya es estudiante, usar metodo merge: true
            const docRefStudent = database.collection(students).doc(newStudent);
        } else {
            //si no existe creara un nuevo documento con la CURP del estudiante y los datos usar metodo apropiado
        }
       

        const newObj = {
            ...obj,
            fecha: datetime
        }
        await docRef.set(newObj)
        return { message : "Pre-inscripción guardada" }
    }

    async getStudentForCURP (stringCurp) {
        try {
            const CURP = await this.validateCURP(stringCurp);
            if (CURP) {
                //buscar primero una preinscripcion en Gsheets
                //Si no se encuentra en preinscripcion, buscar en BD FIRESTORE            
                const findcurp = database.collection()
                const docRef = database.collection(collection).doc(obj.curp);
                await docRef.set(newObj)
                return { message : "Pre-inscripción guardada" }
                
            } else {
                const objInscription= {
                    matricula: "Tu CURP es invalida, revisa la información"
                }
                return objInscription;
            }            
        } catch (error) {
            console.log(error)
        }
    }
    
    async addRegistration(obj){
        const CURP = await this.validateCURP(obj.curp);
        if (CURP) {
            const newObj = {
                ...obj,
                sheet: this.sheet
            }
            //*prueba a Firestore */
            //en Firestore solo guardar la coleccion de
            //*prueba a Firestore */


            //**deshabilitar temporal conexión a Spreadsheets**
            const sheet = await postSpreedSheet(newObj);
            const result = this.lastRegistration();
            //**deshabilitar temporal conexión a Spreadsheets**
            return result
        } else {
            const objInscription= {
                matricula: "Tu CURP es invalida, revisa la información"
            }
            return objInscription;   
        }
    }

    async lastRegistration() {        
        const rows = await getSpreedSheet(this.sheet);        
        const countRows = rows.length        
        const lastInscription = rows[countRows-1].matricula;        
        const objInscription= {
            matricula: lastInscription
        };
        return objInscription;
    }

    async validateCURP(string){
        const CURP = pkgCurp.validar(string)
        return CURP
    }  
}