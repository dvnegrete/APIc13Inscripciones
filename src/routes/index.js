const express = require("express");
const report = require("./reportRouter")
const inscription = require("./inscriptionRouter");
const students = require("./studentsRouter");
const frontendURL = require("./frontendURLRouter");
const specialtie = require("./specialitieRouter");

function routerAPI (app) {  
    const router = express.Router();
    app.use("/API/v1", router)

    router.get("/", (req, res)=>{
        res.send("Servidor para inscripciones")
    });
    router.use("/report", report);
    router.use("/inscription", inscription);
    router.use("/students", students);
    router.use("/frontendURL", frontendURL);
    router.use("/specialtie", specialtie)
}

module.exports = routerAPI;