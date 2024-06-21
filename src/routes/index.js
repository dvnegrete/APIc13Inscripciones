//const { Router } = require("express");
import { Router  } from "express";
import { ExpressAuth  } from "@auth/express";
//const { ExpressAuth } = require("@auth/express");

import inscription  from "./inscriptionRouter.js";
//const inscription = require("./inscriptionRouter");
import students  from "./studentsRouter.js";
//const students = require("./studentsRouter");
import frontendURL  from "./frontendURLRouter.js";
//const frontendURL = require("./frontendURLRouter");
import controlStudents  from "./controlStudentsRouter.js";
//const controlStudents = require("./controlStudentsRouter");
import specialitie  from "./specialitieRouter.js";
//const specialitie = require("./specialitieRouter");
import auth from "./authRouter.js";

export function routerAPI(app) {
    const router = Router();

    //app.set("trust proxy", true);
    //app.use("/auth/*", ExpressAuth({ providers: [] }));

    app.use("/API/v1", router);

    router.get("/", (req, res) => {
        res.json({ status: true });
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
    router.use("/auth", auth);
}
