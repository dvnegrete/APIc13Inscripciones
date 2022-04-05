const fetchURLs = require("../utils/libs/fetchURLs")
//const conexionGSheet = require("../utils/libs/conexionGSheet.js")
const { getSpreedSheat } = require("../utils/libs/spreedsheet");

const nameSheet = require("../models/namesSheet");
const coursesModel = require("../models/sheetCoursesModel");
const inscriptionModel = require("../models/sheetInscriptionModel");
const questionsModel = require("../models/sheetQuestionsModel");;

async function frontendURLService (id){
    const sheetName =  selectIdGSheet(id);
    const rows = await getSpreedSheat(sheetName);
    const data = selectModel(id, rows)
    const infoResult = {...data};    
    return infoResult;
}

function selectModel(id, rows) {
    if (id === 10) {
        const data = coursesModel(rows);
        return data;
    } 
    if (id === 20) {
        const data = inscriptionModel(rows);
        return data;
    } 
    if (id === 30) {
        const data = questionsModel(rows);
        return data;
    }
}

function selectIdGSheet (id){    
    let sheetName = "";    
    switch (id) {
        //id 10: courses
        case 10:
            sheetName = nameSheet.sheetCourses;            
            break;
        //id 20: inscription
        case 20:
            sheetName =  nameSheet.sheetLinkInscription;            
            break;
        //id 30: questions
        case 30:
            sheetName = nameSheet.sheetQuestions;            
            break;
        default:
            sheetName =  ""
            break;
    }     
    return sheetName;    
}

module.exports = frontendURLService;