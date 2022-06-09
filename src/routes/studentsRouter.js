const express = require("express");
const multer = require("multer")
const Students = require("../services/studentsServices.js");
const router = express.Router();
const CURP = require("curp");
const upload = require("../middlewares/multer")


const service = new Students();

router.post("/", async (req, res)=>{
    try {        
        const { curp } = req.body;        
        if (CURP.validar(curp)) {
            console.log("curp de router a servicio")  
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

// router.post(
//     "/newStudent/dataGeneral/birthCertificate",    
//     upload.single("birthCertificate"), (req, res) => {
//         console.log("req.body:", req.body)
//         console.log("req.file:", req.file)
//     const time = new Date();
//     res.send(`El archivo ha sido recibido. ${time}`)    
// })

router.post("/newStudent/dataGeneral", 
    upload.single("birthCertificate"),
    async (req, res)=> {
        try {
            const { body } = req;        
            const studentCURP = await service.isCURPValidate(body);           
            console.log("req.file",req.file)
            //const inscription =  await service.addFirestore(body);
            //res.json(inscription);
            res.json({"message": "saliendo de endpoint de prueba"})
            //si pasa todas las validaciones anteriores entonces se registra en 
            //registrar en GSheets preinscripcion    
        } catch (error) {
            console.log(error)
        }
    }
)

router.post("/:id", async () => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;