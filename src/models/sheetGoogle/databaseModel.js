function ubicationColumn (key){
    let column;
    switch (key) {
        case "email":
            column = "I";
            break;
        case "telefono":
            column = "J";
            break;
        case "calle": 
            column = "K";
            break;
        case "colonia": 
            column = "L";
            break;
        case "municipio": 
            column = "M";
            break;
        case "estado": 
            column = "N";
            break;
        case "cp":
            column = "O";
            break;
        case "discapacidad":
            column = "P";
            break;
        case "escolaridad":
            column = "Q";
            break;
        case "comprobanteDomicilio":
            column = "R";
            break;
        case "comprobanteEstudios":
            column = "S";
            break;
        case "actaNacimiento":
            column = "T";
            break;
        default: 
        //curp
        column = "B";
            break;
    };
    return column;
}

function updateableData (array){
    //campos marcados en azul en Spreedsheets database
    const newArray = array.filter( key =>
        key === "telefono"
        || key === "email"
        || key === "calle"
        || key ==="colonia"
        || key === "municipio"
        || key === "estado"
        || key === "cp"
        || key === "discapacidad"
        || key === "escolaridad"            
        || key === "comprobanteDomicilio"
        || key === "comprobanteEstudios"
        || key === "actaNacimiento"
    );
    return newArray;
}

const rangeData = "I2:T";
    //rango de datos en SpreedSheet que se pueden actualizar

module.exports = { ubicationColumn, updateableData, rangeData };