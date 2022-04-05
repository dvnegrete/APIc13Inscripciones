const { Router } = require("express");
const express = require("express");
const Inscriptions = require("../services/inscriptionService");
const router = express.Router();

const service = new Inscriptions();

router.post("/", async (req, res)=>{
    try {
        const { body } = req;
        const inscription =  await service.addRegistration(body);
        res.json(inscription)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"})
    }
})

module.exports = router;