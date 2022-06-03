const express = require("express");
const Inscriptions = require("../services/inscriptionService");
const router = express.Router();

const service = new Inscriptions();

router.post("/isStudent", async (req, res, next)=> {
    try {      
        const { curp } = req;
        const inscription =  await service.getStudentForCURP(curp);
        res.json(inscription)
    } catch (error) {
        next(error)
        // console.log(error);
        // res.status(500).json({message: "internal server error"})
    }
})

router.post("/newStudent/dataGeneral", async (req, res)=> {
    try {
        const { body } = req;
        console.log(body)
        //const inscription =  await service.addFirestore(body);
        //res.json(inscription);
        res.json({"message": "saliendo de endpoint de prueba"})
        //si pasa todas las validaciones anteriores entonces se registra en 
        //registrar en GSheets preinscripcion    
    } catch (error) {
        console.log(error)
    }
})

router.post("/dbStudent", async (req, res)=> {
    try {
        const { body } = req;
        const inscription =  await service.addFirestore(body);
        res.json(inscription);
        //si pasa todas las validaciones anteriores entonces se registra en 
        //registrar en GSheets preinscripcion    
    } catch (error) {
        
    }
})

router.post("/register", async (req, res, next)=> {
    try {
        //registrar estudiante en BD con cursos actualizado e inscripcion en Gsheet
        const { body } = req;
        const inscription =  await service.addRegistration(body);
        res.json(inscription)
    } catch (error) {
        next(error)
        // console.log(error);
        // res.status(500).json({message: "internal server error"})
    }
})

module.exports = router;