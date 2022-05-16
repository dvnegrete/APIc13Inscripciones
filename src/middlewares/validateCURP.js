const curp = require("curp");

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
    let persona = curp.getPersona();    
    persona.nombre = obj.nombre;
    persona.apellidoPaterno = obj.a_paterno;
    persona.apellidoMaterno = obj.a_materno;
    persona.generar =  obj.genero;
    //Formato: FEMENINO o MASCULINO
    persona.fechaNacimiento =  obj.fechaNacimiento;
    //Formato '22-03-1988';
    persona.estado = obj.estado;
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