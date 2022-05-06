function JSONResponse(dataArray){
    const info = {
        curp: dataArray[0].curp,
        matricula: dataArray[0].matricula,
        a_paterno: dataArray[0].a_paterno,
        a_materno: dataArray[0].a_materno,
        nombre: dataArray[0].nombre,
        telefono: "** **** *456",
        email: "pr*****@****l.com"
    }        
    return info;
}

module.exports =  JSONResponse ;