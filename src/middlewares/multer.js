import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const typeError = new Error("TYPE_FORMAT_INVALID");

const filter = (req, file, cb) => {
    if (
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "application/pdf") {
        cb(null, true)
    } else {
        cb(typeError, false)
    }
};

const filterPDF = (req, file, cb, next) => {
    file.mimetype == "application/pdf" ? cb(null, true) : cb(typeError, false);
}

const upload = multer({
    storage: storage,
    fileFilter: filter,
    limits: {
        fileSize: 5000000
        //Archivos deben ser menores a 5MB.
    }
})

const fInformation = multer({
    storage: storage,
    fileFilter: filterPDF
})

const uploadDocs = upload.fields([
    { name: 'actaNacimiento', maxCount: 1 },
    { name: 'comprobanteDomicilio', maxCount: 1 },
    { name: 'comprobanteEstudios', maxCount: 1 }
]);

const uploadFI = fInformation.array("fileFI")

export { uploadDocs, uploadFI }