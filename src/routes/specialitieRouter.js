import { Router } from "express";
import { badRequest } from "@hapi/boom";
import Specialtie from "./../services/specialtiesService.js";

const router = Router()

const service = new Specialtie();

router.post("/created", async (req, res, next)=> {
  try {
    const name = Object.keys(req.body)[0];
    const data = req.body[name];
    const specialitie = await service.create(name, data);    
    res.json(specialitie)
  } catch (error) {
    throw badRequest();
  }
})

router.post("/update", async (req, res, next)=> {
  try {
    const name = Object.keys(req.body)[0];
    const data = req.body[name];
    const specialitie = await service.update(name, data);    
    res.json(specialitie)
  } catch (error) {
    throw badRequest();
  }
})

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
      const { body } = req;
      if (!id || !body ) {
          res.send("Datos invalidos");
          return false
      }
      const specialitie = service.update(id, body)

      res.send("Ok, el id es: " + id);
  } catch (error) {
    throw badRequest();
  }
});

export default router
