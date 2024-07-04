import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

import { config } from "./../config/index.js";

import ControlStudents from "./../services/controlStudentsService.js";
import { uploadFI } from "./../middlewares/multer.js";
import { oauthMsalTokenHandler } from "./../middlewares/oauthMsalTokenHandler.js";
import { jwtDecodeTokenHandler } from "../middlewares/jwtDecodeHandler.js";

const router = Router();
const service = new ControlStudents();

router.get('/prueba',
    jwtDecodeTokenHandler,
    oauthMsalTokenHandler,
    (req, res, next) => {
        try {
            const { 
                upn:username, 
                name:nameComplete, 
                given_name:name, 
                role  
            } = req.body;
            const payload = {
                username,
                nameComplete,
                name, 
                role
            };
            const token = jwt.sign(payload, config.secret)
            res.cookie("token_jwt", token, {
                httpOnly: true,
                secure: false,
            })
            res.send({ username, token, name, nameComplete, role });
        } catch (error) {
            console.warn("/prueba");
            next(error);
        }
    }
)

router.post("/oauth",
    passport.authenticate("local", { session: false }),
    async (req, res, next) => {
        try {
            const username = req.body.username;
            const { id, role } = req.user;
            const payload = {
                id: id,
                role: role,
                access: true,
            };
            const cookieOptions = {

            }
            const token = jwt.sign(payload, config.secret)
            res.cookie("token_jwt", token, {
                httpOnly: true,
                secure: false,
            })
            res.send({ username, token });
        } catch (error) {
            console.warn("/oauth");
            next(error);
        }
    }
)

//query parameter "user" para la curp. Example: /listBlobs/comprobantes?CURPSTUDENT
router.get("/listBlobs/:container",
    //container = "informacion" or "comprobantes"
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { container } = req.params
            const list = await service.listBlobs(container);
            console.log(list.length);
            if (req.query.user) {
                const listUser = service.findBlobUser(list, req.query.user);
                res.json({ message: listUser })
            } else {
                res.json({ message: list });
            }
        } catch (error) {
            next(error)
        }
    }
)

router.get("/file/:filename",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
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
    passport.authenticate("jwt", { session: false }), uploadFI,
    async (req, res, next) => {
        try {
            const arrayURL = await service.uploadFiPdf(req.files);
            Promise.all(arrayURL).then(response => {
                res.json({ message: response });
            })
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
)

//module.exports = router;
export default router;