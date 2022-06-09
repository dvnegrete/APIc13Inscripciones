const multer= require("multer");
const docsRoute = require("../utils/docs")

const storage = multer.diskStorage({
  destination : docsRoute,
  //la propiedad filename recibe una funcion
  //los parametros son req: informacion de la peticion, file: archivo que se esta subiendo y un CB
  filename: function(req, file, cb){
    cb("", file.originalname)

    //usamos mymetype para sacar la extension del archivo
    //si necesitaramos poner la fecha al archivo:
    //cb("", Date.now() + "." + mimeType.extension(file.mimetype))
  }
})
  
//esta funcion contiene las configuraciones con que se ejecuta Multer, podemos definir varias.
//cambiamos dest: "./ofertaEducativa" por storage ya que lo definimos
const upload = multer({
  storage: storage  
});

// const upload = multer({
//   dest: docsRoute
// });

module.exports = upload