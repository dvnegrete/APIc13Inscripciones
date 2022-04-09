function imageModel(rows, size){
    const data = [];        
        rows.forEach(column => {
            const register = {
                nombre: column.nombre,
                imageHigh: column.high,
                imageMedium: column.medium,
                imageSmall: column.small,
                descripcion: column.descripcion,
            }
            data.push(register);
        });
        //validación para regresar solo el tamaño solicitado desde el Frontend
        if (size != undefined) {
            while (size < data.length) {
                data.pop();
            }
        }
        return data;
}

module.exports = imageModel;