import { nameSheet } from "./namesSheet.js";
//const nameSheet = require("./namesSheet");
import { coursesModel } from "./sheetGoogle/coursesModel.js";
//const coursesModel = require("./sheetGoogle/coursesModel");
import { questionsModel } from "./sheetGoogle/questionsModel.js";
//const questionsModel = require("./sheetGoogle/questionsModel");
import { imageModel } from "./sheetGoogle/imageModel.js";
//const imageModel = require("./sheetGoogle/imageModel");
import { homePageModel } from "./sheetGoogle/homePageModel.js";
//const homePageModel = require("./sheetGoogle/homePageModel");

// function selectModel(id, rows, size) {
//     if (id === 10) {
//         const data = coursesModel(rows);
//         return data;
//     } 
//     // if (id === 20) {
//     //     const data = inscriptionModel(rows);
//     //     return data;
//     // } 
//     if (id === 30) {
//         const data = questionsModel(rows);
//         return data;
//     }
//     if (id === 40) {
//         const data = imageModel(rows, size);
//         return data;
//     }
//     if (id === 50) {
//         const data = homePageModel(rows);
//         return data;
//     }
// }
function selectModel(id, rows, size) {
    switch (id) {
        case 10:
            return coursesModel(rows);
        case 30:
            return questionsModel(rows);
        case 40:
            return imageModel(rows, size);
        case 50:
            return homePageModel(rows);
        case 196:
            return coursesModel(rows);
        default:
            return new Error("Hoja no indicada");
    }
}

function selectIdGSheet(id) {
    switch (id) {
        //id 10: courses
        case 10:
            return nameSheet.sheetCourses;
        //id 20: inscription
        // case 20:
        //     sheetName =  nameSheet.sheetLinkInscription;            
        //     break;
        //id 30: questions
        case 30:
            return nameSheet.sheetQuestions;
        //id 40: image
        case 40:
            return nameSheet.sheetImage;
        case 50:
            return nameSheet.sheetHomePage;
    }
}

//module.exports = spreadsheetsOfertaEducativa;
export { selectModel, selectIdGSheet }