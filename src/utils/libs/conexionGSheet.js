const axios = require("axios")

async function conexionGSheet (url) {
    try {        
        const info = await axios.get(url);        
        const result = await info.json();
        const values = result.values;
        const objResult = {...values};
        return objResult;
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = conexionGSheet;