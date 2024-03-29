const express = require("express");
const ControlStudents = require("./../services/controlStudentsService");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { secret } = require("./../../config");
const { uploadFI } = require("./../middlewares/multer");
//const { checkApiKey } = require("../middlewares/authHandler");

const router = express.Router();
const service = new ControlStudents();

router.post("/oauth",
    passport.authenticate("local", {session: false}),
    async (req, res, next)=> {
        try {
            const username = req.body.username;
            const { id, role } = req.user;
            const payload = {
                id: id,
                role: role,
                access: true,
            };
            const token = jwt.sign(payload, secret)
            res.status(200).json({username, token});
        } catch (error) {
            next(error);
        }
    }
)

//una ruta que solo se usara para crear usuarios y estara desde otro servidor
// router.post("/create", async (req, res, next)=> {
//     try {
//         const { username, password } = req.body;
//         const response = await service.create(username, password)
//         res.json(response);
//     } catch (error) {
//         next(error);
//     }
// })

//query parameter "user" para la curp. Example: /listBlobs/comprobantes?CURPSTUDENT
router.get("/listBlobs/:container",
//container = "informacion" or "comprobantes"
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) =>{
        try {
            const { container } = req.params
            const list = await service.listBlobs(container);            
            if (req.query.user) {
                const listUser = service.findBlobUser(list, req.query.user);
                res.json({message: listUser})
            } else {
                res.json({message: list});
            }
        } catch (error) {
            next(error)
        }
    }
)

router.get("/file/:filename",
    passport.authenticate("jwt", {session: false}),
    async (req, res, next)=>{
        try {
            const { filename } = req.params;
            const file = await service.getFileBlob(filename);
            res.json(file);
        } catch (error) {
            next(error);
        }
    }
)

router.post("/fileInformation",
    passport.authenticate("jwt", {session: false}), uploadFI,
    async(req, res, next) => {
        try {
            const arrayURL = await service.uploadFiPdf(req.files);
            Promise.all(arrayURL).then( response =>{
                res.json({message: response});
            })
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
)

module.exports = router;