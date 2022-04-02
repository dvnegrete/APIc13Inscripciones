const { idSheetCourses, apiKey } = require("../../../config/config");

const baseURL = "https://sheets.googleapis.com/v4/spreadsheets/";

const range = {
    inscription: "inscripcion!A1:A1",
    courses: "Cursos!A:O",
    questions: "preguntas!A:C"
}

const inscriptionURL = `${baseURL}${idSheetCourses}/values/${range.inscription}?key=${apiKey}`;
const coursesURL = `${baseURL}${idSheetCourses}/values/${range.courses}?key=${apiKey}`;
const questionsURL = `${baseURL}${idSheetCourses}/values/${range.questions}?key=${apiKey}`;

const fetchURLs = {
    inscriptionURL: inscriptionURL,
    coursesURL: coursesURL,
    questionsURL: questionsURL
}

module.exports = fetchURLs;