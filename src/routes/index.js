const express = require("express");
const inscription = require("./inscriptionRouter");
const students = require("./studentsRouter");
const frontendURL = require("./frontendURLRouter");
const controlStudents = require("./controlStudentsRouter");
const specialitie = require("./specialitieRouter");
const c196 = require("./c196Router");

function routerAPI (app) {
    const router = express.Router();
    app.use("/API/v1", router);

    router.get("/", (req, res)=>{
        res.json({status: true});
    });
    router.use("/inscription", inscription);
    //inscription no usado. En services funciones para conexion a Firebase
    router.use("/students", students);
    //students desde curso-inscripcion
    router.use("/frontendURL", frontendURL);
    //frontendURL desde cursos, galeria, homePage, preguntas, tv
    router.use("/controlStudents", controlStudents)
    //crear y usar espcialidades
    router.use("/specialitie", specialitie);

    router.use("/c196", c196);
}

module.exports = routerAPI;