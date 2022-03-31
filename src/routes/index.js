const express = require("express");
const report = require("./reportRouter")

function routerAPI (app) {    
    const router = express.Router();
    app.use("/API/v1", router)

    router.get("/", (req, res)=>{
        res.send("Servidor para inscripciones")
    });
    router.use("/report", report);
}

module.exports = routerAPI;
