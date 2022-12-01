const express = require("express");
const ControlStudents = require("./../services/controlStudentsService");
const { checkApiKey } = require("../middlewares/authHandler");

const router = express.Router();
const service = new ControlStudents();

router.post("/oauth", async (req, res)=> {
    try {
        const { username, password } = req.body;
        const user = await service.checkAccess(username, password)
        if (user) {
            console.log("access Grant: ", username);
            res.json({ access: true })
        } else {
            console.log("Acceso NO AUTORIZADO: ", username)
            res.json({ access: false})
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
})

//una ruta que solo se usara para crear usuarios y estara desde otro servidor
router.post("/create", async (req, res)=> {
    try {
        const { username, password } = req.body;
        const response = await service.create(username, password)
        res.json(response);
    } catch (error) {
        console.log(error)
        res.json({ message: false});        
    }
})

router.post("/getFile", async (req, res)=>{
    try {        
        const file = await service.getFileBlob(req.body);
        res.json(file);
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;