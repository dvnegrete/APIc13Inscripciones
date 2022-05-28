const express = require("express");
const Students = require("../services/studentsServices.js");
const router = express.Router();
const CURP = require("curp");


const service = new Students();

router.post("/", async (req, res)=>{
    try {
        //puede llegar matricula o curp, se evaluara primero matricula si llega
        const { curp } = req.body;        
        // if (matricula!= undefined && matricula != "") {
        //     const studentControlNumber = await service.findForControlNumber(matricula);
        //     res.json(studentControlNumber);
        // }
        if (CURP.validar(curp)) {           
            const studentCURP = await service.findForCurp(curp);            
            res.json(studentCURP);
        }        
        else {
            res.json({error:"Validar estructura de información"});
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
})

router.post("/:id", async () => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;