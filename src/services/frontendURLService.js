const fetchURLs = require("../utils/libs/fetchURLs")
//const conexionGSheet = require("../utils/libs/conexionGSheet.js")
const { getSpreedSheat } = require("../utils/libs/spreedsheet")

async function frontendURLService (id){
    const sheetName =  selectIdGSheet(id);
    const rows = await getSpreedSheat(sheetName);    
    const data = rowsGSheet(rows);
    const infoResult = {...data};    
    return infoResult;
}

function rowsGSheet(rows){
    const data = [];
        //forma para  pedir info => rows[0].campo
        //falta definir los models segun la hoja que este trabajando
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

function selectIdGSheet (id){
    let sheetName = ""
    switch (id) {
        //10: courses
        case 10:
            sheetName = "Cursos";
            break;
        //20: inscription
        case 20:
            sheetName =  "inscripcion";
            break;
        //30: questions
        case 30:
            sheetName = "preguntas"
            break;
        default:
            sheetName =  ""
            break;
    }     
    return sheetName;
}

module.exports = frontendURLService;