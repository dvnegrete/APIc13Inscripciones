import { Router } from "express";
import passport from "passport";
import { uploadFI, msalTokenVerify, decodeOauthToken, userAllowedHandler, checkRoleAdmin } from "./../middlewares/index.js";
import ControlStudents from "./../services/controlStudentsService.js";
import { changeTokenUser, deleteUser, getUsers, updateRole } from "../controller/userController.js";

const router = Router();
const service = new ControlStudents();

//eliminar cuando el fronted se actualice
router.get('/prueba',
    [decodeOauthToken, msalTokenVerify, userAllowedHandler],
    changeTokenUser
)

router.get("/oauth",
    [decodeOauthToken, msalTokenVerify, userAllowedHandler],
    changeTokenUser
)

router.put("/updateRole/:id",
    passport.authenticate("jwt", { session: false }),
    checkRoleAdmin,
    updateRole
)

router.get("/users",
    passport.authenticate("jwt", { session: false }),
    checkRoleAdmin,
    getUsers,
)

router.delete("/user/:id",
    passport.authenticate("jwt", { session: false }),
    checkRoleAdmin,
    deleteUser,
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