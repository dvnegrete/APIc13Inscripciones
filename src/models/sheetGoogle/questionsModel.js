export function questionsModel(rows) {
    const data = [];
    rows.forEach(column => {
        const register = {
            link: column.link,
            pregunta: column.pregunta,
            respuesta: column.respuesta
        }
        data.push(register);
    });
    return data;
}