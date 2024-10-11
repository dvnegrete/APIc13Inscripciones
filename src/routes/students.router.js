import { Router } from "express";
import { uploadDocs } from "../middlewares/index.js";
import {
  dataGeneral,
  dbStudent,
  files,
  inscription,
  typeRegister,
} from "../controller/students.controller.js";

const router = Router();
router.get("/typeRegister/:curp", typeRegister);
router.post("/newStudent/dataGeneral", uploadDocs, dataGeneral);
router.post("/newStudent/inscription", uploadDocs, inscription);
router.post("/DBStudent", uploadDocs, dbStudent);
router.post("/files", uploadDocs, files);

export default router;
