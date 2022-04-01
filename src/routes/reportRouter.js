const { Router } = require("express");
const express = require("express");
const Report = require("../services/reportService");
const router = express.Router();

const service = new Report();

router.get("/", async (req, res)=>{
    try {
        const report = await service.getInfo();
        res.json(report);        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"})
    }
})

//***prueba para count */
// router.get("/", async (req, res)=>{
//     try {
//         const report = await service.countBD();
//         console.log("count", report)
//         res.json({"message":"procesado"});        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "internal server error"})
//     }
// })

module.exports = router;