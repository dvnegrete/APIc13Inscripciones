const express = require("express");
const router = express.Router();
const Specialtie = require("../services/specialtiesService");

const service = new Specialtie();

router.get("/", async (req, res)=>{
  try {
    const specialties = await service.getAll();
    res.json(specialties);
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "internal server error"})
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const specialitie = await service.findOne(id);
    res.json(specialitie);
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "internal server error"})
  }
})

router.get("/:", async (req, res) => {
  try {
    const { name } = req.params
    console.log(name)
    const specialitie = await service.getOne(name);
    res.json(specialitie);
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "internal server error"})
  }
})

router.post("/", async (req, res)=> {
  try {
    const { body  } = req;
    const specialitie = await service.create(body);
    res.json({
      message: "Created",
      id: specialitie,
      data: body
    });
  } catch (error) {
    console.log(error)
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
      const { body } = req;
      if (!id || !body ) {
          res.send("Datos invalidos");
          return false
      }
      const specialitie = service.update(id, body)

      //const specialitie= await service.update(id)
      res.send("Ok, el id es: " + id);
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
