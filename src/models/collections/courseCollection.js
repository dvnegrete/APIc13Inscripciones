export function createCourseCollection (obj) {
    const nameCollection = `${obj.curso} - ${obj.fechaInicio} - ${obj.profesor}`
    return nameCollection;
}

//module.exports = createCourseCollection;