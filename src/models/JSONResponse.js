function JSONResponse(dataArray){
    const info = {
        curp: dataArray[0].curp,
        matricula: dataArray[0].matricula,
        a_paterno: dataArray[0].a_paterno,
        a_materno: dataArray[0].a_materno,
        nombre: dataArray[0].nombre,
        //trabajar en el cifrado parcial
        telefono: dataArray[0].telefono,
        email: dataArray[0].email
        //trabajar en el cifrado parcial
    }        
    return info;
}

module.exports =  JSONResponse ;