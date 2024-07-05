import { Router } from "express";

import inscription from "./inscriptionRouter.js";
import students from "./studentsRouter.js";
import frontendURL from "./frontendURLRouter.js";
import controlStudents from "./controlStudentsRouter.js";
import specialitie from "./specialitieRouter.js";

export function routerAPI(app) {
    const router = Router();
    app.use("/API/v1", router);

    router.get("/", (req, res) => {
        res.json({ status: true });
    });

    //inscription PENDIENTE. En services para conexion a Firebase
    router.use("/inscription", inscription);

    //students desde curso-inscripcion
    router.use("/students", students);

    //frontendURL desde cursos, galeria, homePage, preguntas, tv
    router.use("/frontendURL", frontendURL);

    router.use("/controlStudents", controlStudents)

    //crear y usar especialidades
    router.use("/specialitie", specialitie);
}
