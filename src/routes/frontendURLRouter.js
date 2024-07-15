import { Router } from "express";
import service from "./../services/frontendURLService.js";

const router = Router();

router.get("/imageHomePage", async (req, res) => {
    try {
        const { size } = req.query;
        const urlfrontend = await service(parseInt(40), size);
        res.json(urlfrontend)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const urlfrontend = await service(parseInt(id));
        res.json(urlfrontend)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" })
    }
})
export default router;