import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const typeError = new Error("FILES_TYPE_ERROR");
const maxSize = 5000000; //Archivos <= 5MB.
const allowedTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(typeError, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxSize,
  },
});

export const uploadDocs = upload.any();
