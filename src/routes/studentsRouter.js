const { Router } = require("express");
const express = require("express");
const Students = require("../services/studentsServices.js");
const router = express.Router();

const service = new Students();

router.post("/", async (req, res)=>{
    try {
        //puede llegar matricula o curp, se evaluara primero matricula si llega
        const { matricula, curp } = req.body;
        if (matricula!= undefined ) {
            const studentControlNumber = await service.findForControlNumber(matricula);
            res.json(studentControlNumber);
        }
        else if (curp != undefined ) {
            const studentCURP = await service.findForCurp(curp);            
            res.json(studentCURP);
        }         
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"})
    }
})

module.exports = router;