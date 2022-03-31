const { Router } = require("express");
const express = require("express");
const Report = require("../services/reportService");
const router = express.Router();

const service = new Report();

router.get("/", async (req, res)=>{
    const report = await service.getCURP();
    res.send("Generar Reporte de SpreadSheets")    
})

module.exports = router;