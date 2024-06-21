export function homePageModel(rows){
    const data = [];        
        rows.forEach(column => {
            const register = {
                titulo: column.titulo,
                informacion: column.informacion,
                notas: column.notas,
                botones: column.botones,
                animacion: column.animacion,
                link: column.link
            }
            data.push(register);
        });
        return data;
}

//module.exports = homePageModel;