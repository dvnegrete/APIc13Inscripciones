const multer = require("multer");

const storage = multer.memoryStorage()

const filter = (req, file, cb) => {
    if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "application/pdf") 
    {
        cb(null, true)
    } else {
        cb( (new Error("TYPE_FORMAT_INVALID")), false)            
    }
};

const upload = multer({
    storage: storage,
    fileFilter: filter,
    limits: {
        fileSize: 5000000
        //Archivos deben ser menores a 5MB.
    }
})

const uploadDocs =  upload.fields([
    { name: 'actaNacimiento', maxCount: 1 },
    { name: 'comprobanteDomicilio', maxCount: 1 },
    { name: 'comprobanteEstudios', maxCount: 1 }
]);

module.exports = { uploadDocs };