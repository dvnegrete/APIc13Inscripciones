import { Router } from "express";

import students from "./studentsRouter.js";
import frontendURL from "./frontendURLRouter.js";
import controlStudents from "./controlStudentsRouter.js";

export function routerAPI(app) {
  const router = Router();
  app.use("/API/v1", router);

  router.get("/", (req, res) => {
    res.json({ status: true });
  });

  //students desde curso-inscripcion
  router.use("/students", students);

  //frontendURL desde cursos, galeria, homePage, preguntas, tv
  router.use("/frontendURL", frontendURL);

  router.use("/controlStudents", controlStudents);
}
