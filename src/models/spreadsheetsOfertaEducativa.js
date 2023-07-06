const nameSheet = require("./namesSheet");

const coursesModel = require("./sheetGoogle/coursesModel");
//const inscriptionModel = require("./sheetGoogle/inscriptionModel");
const questionsModel = require("./sheetGoogle/questionsModel");
const imageModel = require("./sheetGoogle/imageModel");
const homePageModel = require("./sheetGoogle/homePageModel");

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

function selectIdGSheet (id){    
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
            return  nameSheet.sheetHomePage;
        case 196:
            return nameSheet.sheet196Courses;
    }     
}

const spreadsheetsOfertaEducativa = {
    selectModel: selectModel,
    selectIdGSheet: selectIdGSheet
}

module.exports = spreadsheetsOfertaEducativa;