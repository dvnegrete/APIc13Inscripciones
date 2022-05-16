function documentStudentCURP (objOrArray) {
    //hasta el momento en que se inscriba entonces se registra em BD
    const document = {
        aPaterno: objOrArray.aPaterno,
        aMaterno: objOrArray.aMaterno,
        nombre: objOrArray.nombre,
        genero: objOrArray.genero,
        //hombre = true, mujer = false
        fechaNacimiento: objOrArray.fechaNacimiento,
        lugarNacimiento: objOrArray.lugarNacimiento,
        email: objOrArray.email,
        telefono: objOrArray.telefono,
        domicilio: {
            calleNumero: objOrArray.calleNumero,
            colonia: objOrArray.colonia,
            cp: objOrArray.cp,
            alcaldia: objOrArray.alcaldia,
            estado: objOrArray.estado
        },
        matricula: objOrArray.matricula,
        ultimaInscripcion: Date.now(),
        discapacidad: objOrArray.discapacidad,
        comprobanteDomicilio:"liga a Storage",
        actaNacimiento:"liga a Storage",
        comprobanteDomicilio: "liga a Storage",
        cursos: [
            {
                curso: objOrArray.curso,
                fecha_inicio: objOrArray.fechaInicio,
                profesor: objOrArray.profesor
            }
        ]
    }
    return document;
}

module.exports= documentStudentCURP;