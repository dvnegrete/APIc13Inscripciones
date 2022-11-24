const { apiKey } = require("../../config")

function checkApiKey (req, res, next) {
    // const key = req.headers['api'];
    // if(key === apikey) {
    //     next(); 
    // } else {
    //     console.log("no autorizado")
    // }
    console.log("Pasando por authHandler, checkApiKey")
}

module.exports = { checkApiKey };