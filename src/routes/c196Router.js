const express = require("express");
const service = require("../services/c196Service")

const router = express.Router();

router.get("/", async (req, res)=>{
    try {        
        const urlfrontend = await service();
        res.json(urlfrontend);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"})
    }
})

module.exports = router;