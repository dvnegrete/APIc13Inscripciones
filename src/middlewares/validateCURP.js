import curp from "curp";
//const curp = require("curp");
import { config } from "./../config/index.js";
//const { dateForCurp } = require("../../config")

// let persona = curp.getPersona();
// persona.nombre = 'Andrés Manuel';
// persona.apellidoPaterno = 'López';
// persona.apellidoMaterno = 'Obrador';
// persona.genero = curp.GENERO.MASCULINO;
// persona.fechaNacimiento = '13-11-1953';
// persona.estado = curp.ESTADO.TABASCO;
// console.log( curp.generar(persona) );

export function generateCURP(obj) {
    const date = new Date(obj.fechaNacimiento);
    //console.log("date", date)
    const formatDate = (date) => {
        const dateValueCorrection = parseInt(config.dateForCurp, 10);
        //en App Engine Produccion, no sumar nada en el día
        //en ambiente local sumar 1. para que funcione.
        //let formatted_date = date.getDate() + "-" + (date.getMonth()+ 1) + "-" + date.getFullYear()

        let formatted_date = (date.getDate() + dateValueCorrection) + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        return formatted_date;
    }
    const fecha = formatDate(date)
    //console.log("fecha", fecha)
    const gender = obj.genero;
    const estado = obj.estado;
    let persona = curp.getPersona();
    persona.nombre = obj.nombre;
    persona.apellidoPaterno = obj.a_paterno;
    persona.apellidoMaterno = obj.a_materno;
    persona.genero = curp.GENERO[gender];
    //Formato: FEMENINO o MASCULINO
    persona.fechaNacimiento = fecha;
    //Formato '22-03-1970';
    persona.estado = curp.ESTADO[estado];
    const string = curp.generar(persona);
    return string
}

export function validateCURP(property) {
    return (req, res, next) => {
        const data = req[property].curp;
        if (curp.validar(data)) {
            next(data)
        } else {
            res.status(400).json({
                message: "Curp no valida"
            })
        }
    }
}

export function errorCurp(req, res, next) {
    res.status(400).json({
        message: "Curp no valida"
    })
}

export function compareDigitVerifyCurp(userCURP, createCURP) {
    const userArray = userCURP.split("", 16);
    const createArray = createCURP.split("", 16);
    const newUserCurp = userArray.join("");
    const newCreateCurp = createArray.join("");
    const res = newUserCurp === newCreateCurp ? true : false;
    return res;
}

export const messageDuplicity = `Lo sentimos, no podemos validar el dígito verificador de tu CURP. 
Por favor acude a la ventanilla del plantel para continuar tu inscripcion. 
Lamentamos los inconvenientes que esto puede causar.`;

export const messageErrorCurp = "Verifica la informacíon";

// module.exports = {
//     validateCURP,
//     generateCURP,
//     errorCurp,
//     compareDigitVerifyCurp,
//     messageDuplicity,
//     messageErrorCurp
// };