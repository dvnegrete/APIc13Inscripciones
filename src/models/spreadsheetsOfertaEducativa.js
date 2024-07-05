import { nameSheet } from "./namesSheet.js";
import { coursesModel, homePageModel, imageModel, questionsModel } from "./sheetGoogle/index.js";

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

export { selectModel, selectIdGSheet }