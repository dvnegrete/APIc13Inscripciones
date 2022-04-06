function coursesModel(rows){
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
        return data;
}

module.exports = coursesModel;