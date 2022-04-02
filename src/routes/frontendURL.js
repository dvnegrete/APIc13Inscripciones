const { Router } = require("express");
const express = require("express");
const service = require("../services/frontendURLService")

const router = express.Router();

router.get("/:id", async (req, res)=>{
    try {
        const { id } = req.params;        
        const urlfrontend = service(parseInt(id));
        res.json({message: urlfrontend})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"})
    }
})

module.exports = router;