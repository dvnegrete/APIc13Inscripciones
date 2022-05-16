function documentCourse (objOrArray) {

    //determinar que campos crear para este documento
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
        discapacidad: objOrArray.discapacidad,
        cursos: [
            {
                curso: objOrArray.curso,
                fechaInicio: objOrArray.fechaInicio,
                profesor: objOrArray.profesor
            }
        ]
    }
    return document;
}

module.exports= documentCourse;