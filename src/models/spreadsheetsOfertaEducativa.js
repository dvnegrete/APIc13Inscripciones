const nameSheet = require("./namesSheet");

const coursesModel = require("./sheetGoogle/coursesModel");
//const inscriptionModel = require("./sheetGoogle/inscriptionModel");
const questionsModel = require("./sheetGoogle/questionsModel");
const imageModel = require("./sheetGoogle/imageModel");
const homePageModel = require("./sheetGoogle/homePageModel");

function selectModel(id, rows, size) {
    if (id === 10) {
        const data = coursesModel(rows);
        return data;
    } 
    // if (id === 20) {
    //     const data = inscriptionModel(rows);
    //     return data;
    // } 
    if (id === 30) {
        const data = questionsModel(rows);
        return data;
    }
    if (id === 40) {
        const data = imageModel(rows, size);
        return data;
    }
    if (id === 50) {
        const data = homePageModel(rows);
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
        // case 20:
        //     sheetName =  nameSheet.sheetLinkInscription;            
        //     break;
        //id 30: questions
        case 30:
            sheetName = nameSheet.sheetQuestions;            
            break;
        //id 40: image
        case 40:
            sheetName = nameSheet.sheetImage;            
            break;
        case 50:
            sheetName =  nameSheet.sheetHomePage;
            break;
    }     
    return sheetName;    
}

const spreadsheetsOfertaEducativa = {
    selectModel: selectModel,
    selectIdGSheet: selectIdGSheet
}

module.exports = spreadsheetsOfertaEducativa;