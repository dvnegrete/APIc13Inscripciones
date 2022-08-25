function ubicationColumn (key){
    let column;
    switch (key) {
        case "telefono":
            column = "I";
            break;
        case "email":
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
        case "escolaridad":
            column = "P";
            break;        
        case "comprobante_domicilio":
            column = "Q";
            break;
        case "comprobante_estudios":
            column = "R";
            break;
        default: 
        //curp
        column = "B";
            break;
    };
    return column;
}

function updateableData (array){
    const newArray = array.filter( key =>
        key === "telefono" 
        || key === "email" 
        || key === "calle"
        || key ==="colonia"
        || key === "municipio"
        || key === "estado"
        || key === "cp"
        || key === "escolaridad"            
        || key === "comprobante_domicilio"
        || key === "comprobante_estudios"
    );
    return newArray;
}

const rangeData = "I2:R";
    //rango de datos en SpreedSheet que se pueden actualizar

module.exports = { ubicationColumn, updateableData, rangeData };