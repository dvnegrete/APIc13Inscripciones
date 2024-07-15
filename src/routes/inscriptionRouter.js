import { Router } from "express";
import Inscriptions from "./../services/inscriptionService.js";

const router = Router();

const service = new Inscriptions();

router.post("/isStudent", async (req, res, next)=> {
    try {      
        const { curp } = req;
        const inscription =  await service.getStudentForCURP(curp);
        res.json(inscription)
    } catch (error) {
        next(error)
    }
})

router.post("/newStudent/dataGeneral", async (req, res)=> {
    try {
        const { body } = req;
        console.log(body)
        res.json({"message": "saliendo de endpoint de prueba"})
    } catch (error) {
        console.log(error)
    }
})

router.post("/dbStudent", async (req, res)=> {
    try {
        const { body } = req;
        const inscription =  await service.addFirestore(body);
        res.json(inscription);
    } catch (error) {
        
    }
})

router.post("/register", async (req, res, next)=> {
    try {
        const { body } = req;
        const inscription =  await service.addRegistration(body);
        res.json(inscription)
    } catch (error) {
        next(error)
    }
})

export default router;