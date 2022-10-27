const curp = require("curp");

// let persona = curp.getPersona();
// persona.nombre = 'Andrés Manuel';
// persona.apellidoPaterno = 'López';
// persona.apellidoMaterno = 'Obrador';
// persona.genero = curp.GENERO.MASCULINO;
// persona.fechaNacimiento = '13-11-1953';
// persona.estado = curp.ESTADO.TABASCO;
// console.log( curp.generar(persona) );

function generateCURP (obj) {
    const date = new Date(obj.fechaNacimiento);
    //console.log("date", date)
    const formatDate = (date)=>{
        //en App Engine Produccion, no sumar nada en el día
        //let formatted_date = date.getDate() + "-" + (date.getMonth()+ 1) + "-" + date.getFullYear()
        
        //en ambiente local sumar 1. Revisar mas adelante por que falla
        let formatted_date = (date.getDate() + 1) + "-" + (date.getMonth()+ 1) + "-" + date.getFullYear()
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
    persona.genero =  curp.GENERO[gender];
    //Formato: FEMENINO o MASCULINO
    persona.fechaNacimiento =  fecha;
    //Formato '22-03-1970';
    persona.estado = curp.ESTADO[estado];    
    const string = curp.generar(persona);
    return string
}

function validateCURP (property) {
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

function errorCurp (req, res, next) {
    res.status(400).json({
        message: "Curp no valida"
    })
}

module.exports = { validateCURP, generateCURP ,errorCurp }