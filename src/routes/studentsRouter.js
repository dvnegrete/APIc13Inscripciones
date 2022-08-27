const express = require("express");
const Students = require("../services/studentsServices.js");
const router = express.Router();
const CURP = require("curp");

const service = new Students();

router.post("/typeRegister", async (req, res)=>{
    try {
        const { curp } = req.body;
        if (CURP.validar(curp)) {
            const studentCURP = await service.findForCurp(curp);
            //pendiente encriptar respuesta antes de enviar
            res.json(studentCURP);
        }
        else {
            res.json({message:"Wrong Structure"});
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

router.post("/newStudent/inscription", async (req, res)=> {
    try {
        const { body } = req;
        const dataCompleted = await service.toCompleteInformationBody(body);
        //registrar en GSheets preinscripcion
        const inscriptionData = await service.addInscriptionNewStudent(dataCompleted);
        if (inscriptionData === { error: "Conexion-Spreedsheet" }) {
            res.json(newStudentCURPValidate)
        }        
        res.json(inscriptionData);                       
    } catch (error) {
        console.log(error)
        console.log("error catch en router NewStudent/inscription")
    }
})

router.post("/DBStudent", async (req, res) => {
    try {
        const { body } = req;        
        const update = await service.addInscriptionDBStudent(body);
        //formato respuesta: {status: boolean, update: boolean, matricula: string, fechaRegistro: string}
        res.json(update);
    } catch (error) {
        console.error(error);
        console.log("error catch en router /DBStudent")
    }
})

module.exports = router;