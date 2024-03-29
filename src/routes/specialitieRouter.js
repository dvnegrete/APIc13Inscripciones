const express = require("express");
const boom = require("@hapi/boom");
const router = express.Router();
const Specialtie = require("../services/specialtiesService");

const service = new Specialtie();

// router.get("/", async (req, res)=>{
//   try {
//     const specialties = await service.getAll();
//     res.json(specialties);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({message: "internal server error"})
//   }
// })

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params
//     const specialitie = await service.findOne(id);
//     res.json(specialitie);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({message: "internal server error"})
//   }
// })

// router.get("/:", async (req, res) => {
//   try {
//     const { name } = req.params
//     console.log(name)
//     const specialitie = await service.getOne(name);
//     res.json(specialitie);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({message: "internal server error"})
//   }
// })

router.post("/created", async (req, res, next)=> {
  try {
    const name = Object.keys(req.body)[0];
    const data = req.body[name];
    const specialitie = await service.create(name, data);    
    res.json(specialitie)
  } catch (error) {
    throw boom.badRequest();
  }
})

router.post("/update", async (req, res, next)=> {
  try {
    const name = Object.keys(req.body)[0];
    const data = req.body[name];
    const specialitie = await service.update(name, data);    
    res.json(specialitie)
  } catch (error) {
    throw boom.badRequest();
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

      //const specialitie= await service.update(id)
      res.send("Ok, el id es: " + id);
  } catch (error) {
    throw boom.badRequest();
  }
});

module.exports = router;
