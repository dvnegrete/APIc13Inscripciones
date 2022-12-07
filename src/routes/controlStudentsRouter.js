const express = require("express");
const ControlStudents = require("./../services/controlStudentsService");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { secret } = require("./../../config")
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

router.post("/getFile", 
    passport.authenticate("jwt", {session: false}),
    async (req, res, next)=>{
        try {
            const file = await service.getFileBlob(req.body);
            res.json(file);
        } catch (error) {            
            next(error);
        }
    }
)

module.exports = router;