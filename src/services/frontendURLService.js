const fetchURLs = require("../utils/libs/fetchURLs")
const conexionGSheet = require("../utils/libs/conexionGSheet.js")

function frontendURLService (id){
    let URL = ""
    switch (id) {
        //10: courses
        case 10:
            URL = fetchURLs.coursesURL;
            break;
        //20: inscription
        case 20:
            URL =  fetchURLs.inscriptionURL;
            break;
        //30: questions
        case 30:
            URL = fetchURLs.questionsURL
            break;
        default:
            URL =  "cecati13.com.mx"
            break;
    }
    const result = conexionGSheet(URL);
    return result;
}

module.exports = frontendURLService;