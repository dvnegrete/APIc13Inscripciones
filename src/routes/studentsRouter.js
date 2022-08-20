const express = require("express");
const Students = require("../services/studentsServices.js");
const router = express.Router();
const CURP = require("curp");
//const upload = require("../middlewares/multer")
// const docsRoute = require("../utils/docs")
// const upload = multer({ dest: docsRoute })

const service = new Students();

router.post("/typeRegister", async (req, res)=>{
    try {
        const { curp } = req.body;
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

router.post("/newStudent/dataGeneral", async (req, res)=> {
    try {
        const { body } = req;        
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
        } else if (newStudentCURPValidate === { error: "Conexion-Spreedsheet" }) {
            res.json(newStudentCURPValidate)            
        }  else {
            res.json({responseObj})
        }
    } catch (error) {
        console.log(error)
    }
})

//funcion con carga de archivos en multer
router.post("/newStudent/inscription",
    //upload.fields(service.typefilesUpload()),
    async (req, res)=> {
        try {
            const { body } = req;            
            const dataCompleted = await service.toCompleteInformationBody(inscriptionFiles, body);
            //registrar en GSheets preinscripcion
            const inscriptionData = await service.addRegistration(dataCompleted);
            if (inscriptionData === { error: "Conexion-Spreedsheet" }) {
                res.json(newStudentCURPValidate)
            }
            console.log("final de /newStudent/inscription con respuesta: ", inscriptionData);
            res.json(inscriptionData);                       
        } catch (error) {
            console.log(error)
            console.log("error catch en router Student")
        }
    }
)

router.post("/:id", async () => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;