const express = require("express");
const multer = require("multer")
const Students = require("../services/studentsServices.js");
const router = express.Router();
const CURP = require("curp");
const upload = require("../middlewares/multer")
// const docsRoute = require("../utils/docs")
// const upload = multer({ dest: docsRoute })
const filesUpload = [
    { name: 'actaNacimiento', maxCount: 1 },
    { name: 'comprobanteDomicilio', maxCount: 1 },
    { name: 'comprobanteEstudios', maxCount: 1 }
];

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

router.post("/newStudent/dataGeneral", async (req, res)=> {
    try {
        const { body } = req;
        console.log("body", body);
        const newStudentCURPValidate = service.isCURPValidate(body);            
        const responseObj = {
            curp: body.curp,
            nombre: body.nombre, 
            a_paterno: body.a_paterno,
            a_materno: body.a_materno,
            placeofBirth: body.estado,
            gender: body.genero,
            disability: body.disability,
            birthdate: body.fechaNacimiento,            
            actaNacimientoRender: body.actaNacimientoRender
        }
        if (!newStudentCURPValidate) {
            res.json({"curp": "false"})
        } else {
            res.json({responseObj})
        }
        
        //const inscription =  await service.addFirestore(body);
        //res.json(inscription);
        //si pasa todas las validaciones anteriores entonces se registra en 
        //registrar en GSheets preinscripcion    
    } catch (error) {
        console.log(error)
    }
})

//funcion con carga de archivos en multer

router.post("/newStudent/inscription", 
    upload.fields(filesUpload),
    async (req, res)=> {
        try {
            // console.log("files", req.files)
            // console.log("curp", req.body.curp)
            console.log(" en /newStudent/inscription")
            const inscription =  await service.uploadStorage(req.files, req.body);            
            res.json(inscription);
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