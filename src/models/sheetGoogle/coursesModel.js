function coursesModel(rows){
    const data = [];        
        rows.forEach(column => {
            const register = {
                inscritos: column.inscritos,
                curso: column.curso,
                especialidad: column.especialidad,
                hora_inicio: column.hora_inicio,
                hora_fin: column.hora_fin,
                fecha_inicio: column.fecha_inicio,
                fecha_termino: column.fecha_termino,
                dias_de_clases: column.dias_de_clases,
                profesor: column.profesor,
                horas: column.horas,
                tipo_de_curso: column.tipo_de_curso,
                modalidad_curso: column.modalidad_curso,
                observaciones: column.observaciones,
                imagenURL: column.imagenURL
            }
            data.push(register);
        });
        return data;
}

module.exports = coursesModel;