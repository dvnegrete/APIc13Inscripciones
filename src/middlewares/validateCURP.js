const curp = require("curp");
const { format }= require("date-fns")

function validar(string){
    if(curp.validar(string)){
        console.log("Curp Valida")
    } else {
        console.log("Error en CURP")
    }
}
const curpString = "VAND870419HDFLGM01";
validar(curpString)

// let persona = curp.getPersona();
// persona.nombre = 'Claudia Noemí';
// persona.apellidoPaterno = 'Hernández';
// persona.apellidoMaterno = 'Rodriguez';
// persona.genero = "FEMENINO";
// persona.fechaNacimiento = '22-03-1988';
// persona.estado = curp.ESTADO.DISTRITO_FEDERAL;
// console.log( curp.generar(persona) ); 

function generateCURP (obj) {
    const date = new Date(obj.fechaNacimiento);
    const formatDate = (date)=>{
        let formatted_date = (date.getDate() + 1) + "-" + (date.getMonth()+ 1) + "-" + date.getFullYear()
        return formatted_date;
    }
    const fecha = formatDate(date)
    console.log(fecha)
    const gender = obj.genero;
    const estado = obj.estado;
    let persona = curp.getPersona();
    persona.nombre = obj.nombre;
    persona.apellidoPaterno = obj.a_paterno;
    persona.apellidoMaterno = obj.a_materno;
    persona.genero =  curp.GENERO[gender];
    //Formato: FEMENINO o MASCULINO
    persona.fechaNacimiento =  fecha;
    //Formato '22-03-1988';
    persona.estado = curp.ESTADO[estado];
    console.log(persona)
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