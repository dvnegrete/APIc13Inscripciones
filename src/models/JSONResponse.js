const { hideCharactersPhone , hideCharactersEmail } = require("../utils/hideCharacters");

function JSONResponse(dataArray){
    let info = {};    
    const date = dataArray[0].fechaRegistro;
    //Si date es undefined, los datos son previos a este sistema de inscripciones, y obligamos a actualizar info.
    if (date) {
        const telefonoEncrypted = hideCharactersPhone(dataArray[0].telefono);
        const emailEncrypted =  hideCharactersEmail(dataArray[0].email);
        info = {
            curp: dataArray[0].curp,
            matricula: dataArray[0].matricula,
            a_paterno: dataArray[0].a_paterno,
            a_materno: dataArray[0].a_materno,
            nombre: dataArray[0].nombre,
            telefono: telefonoEncrypted,
            email: emailEncrypted,        
        }
    } else {
        info = {
            curp: dataArray[0].curp,
            matricula: dataArray[0].matricula,
            a_paterno: dataArray[0].a_paterno,
            a_materno: dataArray[0].a_materno,
            nombre: dataArray[0].nombre,
            updateContact : true
        }
    }
    return info;
}

function JSONgetDB(dataArray){
    const info = {
        fechaRegistro: dataArray[0].fechaRegistro,
        curp: dataArray[0].curp,
        matricula: dataArray[0].matricula,
        a_paterno: dataArray[0].a_paterno,
        a_materno: dataArray[0].a_materno,
        nombre: dataArray[0].nombre,
        genero: dataArray[0].genero,
        fechaNacimiento: dataArray[0].fechaNacimiento,
        email: dataArray[0].email,
        telefono: dataArray[0].telefono,
        calle: dataArray[0].calle,
        colonia: dataArray[0].colonia,
        municipio: dataArray[0].municipio,
        estado: dataArray[0].estado,
        cp: dataArray[0].cp,
        discapacidad: dataArray[0].discapacidad,
        escolaridad: dataArray[0].escolaridad,
        comprobanteDomicilio: dataArray[0].comprobanteDomicilio,
        comprobanteEstudios: dataArray[0].comprobanteEstudios,
        actaNacimiento: dataArray[0].actaNacimiento
    }
    return info;
}

module.exports =  { JSONResponse, JSONgetDB } ;