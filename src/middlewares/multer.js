const multer= require("multer");
const docsRoute = require("../utils/docs")

const storage = multer.diskStorage({
  destination : docsRoute,
  //la propiedad filename recibe una funcion
  //los parametros son req: informacion de la peticion, file: archivo que se esta subiendo y un CB
  filename: function(req, file, cb){    
    const ext = file.mimetype.split("/")[1]
    //cb("", file.fieldname + "." + ext)
    cb("", req.body.curp + "-" +  file.fieldname + "." + ext)
    //usamos mymetype para sacar la extension del archivo
    //si necesitaramos poner la fecha al archivo:
    //cb("", Date.now() + "." + mimeType.extension(file.mimetype))
  }  
})

const filter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "application/pdf") 
    {
    cb(null, true)
  } else {
    cb(null, false)
    console.log(file.mimetype)
  }
}
  
//esta funcion contiene las configuraciones con que se ejecuta Multer, podemos definir varias.
const upload = multer({
  storage: storage,
  fileFilter: filter,
  //falta que valide que sea menor a 5MB. No esta funcionando aun. Solo validando en Frontend
  limits: {fieldSize: 500000}
});

module.exports = upload