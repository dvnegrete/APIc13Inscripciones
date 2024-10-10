import { request, response } from "express";
import {
  listBlobsService,
  findBlobUser,
  getFileBlob,
  deleteFileBlob,
  uploadFiPdf,
} from "../services/files.service.js";
import Students from "../services/students.service.js";
import ControlStudents from "../services/controlStudents.service.js";
import { nameContainer } from "../models/containerAzure.js";

const serviceStudents = new Students();
const serviceControlStudents = new ControlStudents();

const limitShowRecords = 30;

//query parameter "user" para la curp. Example: /listBlobs/comprobantes?CURPSTUDENT
export const getListBlobs = async (req = request, res = response, next) => {
  try {
    const { container } = req.params;
    const list = await listBlobsService(container);
    if (req.query.user) {
      const listUser = findBlobUser(list, req.query.user);
      res.json({ message: listUser });
    } else {
      res.json({ message: list });
    }
  } catch (error) {
    next(error);
  }
};

export const getRegistrationRecord = async (
  req = request,
  res = response,
  next
) => {
  try {
    const { user, numberControl } = req.query;
    if (user) {
      const studentRecord = await serviceStudents.getDataDB(user);
      studentRecord === undefined
        ? res.status(404).json({ msg: "No existe" })
        : res.json({ studentRecord });
    } else if (numberControl) {
      const studentRecord = await serviceStudents.getDataNControlDB(
        numberControl
      );
      studentRecord === undefined
        ? res.status(404).json({ msg: "No existe" })
        : res.json({ studentRecord });
    } else {
      res.status(404).json({ msg: "No existe" });
    }
  } catch (error) {
    next(error);
  }
};

export const getInfoSISAE = async (req = request, res = response, next) => {
  try {
    const { matricula } = req.params;
    if (matricula !== undefined) {
      const response = { msg: "", students: [] };
      const students = await serviceControlStudents.getInfoSISAE(
        matricula,
        limitShowRecords
      );
      if (students.length === 0) {
        response.msg = "No existe información";
      } else if (students.length >= limitShowRecords) {
        response.msg = `Mostrando solamente ${limitShowRecords} registros a partir de la matricula: ${matricula}`;
      }
      response.students = students;
      res.json(response);
    } else {
      res.json({ msg: "Undefined Values" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTableId = async (req = request, res = response, next) => {
  try {
    const { table } = req.params;
    const { id } = req.query;
    if (table !== undefined && id !== undefined) {
      const statusID = await serviceControlStudents.deleteId(table, id);
      res.json({ statusID });
    } else {
      res.json({ msg: "Undefined Values" });
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @property {string} req.params.filename - User CURP
 * @property {('estudios'|'domicilio'|'nacimiento')} req.query.type - Type of file you are requesting
 *
 * @returns {void} - return a base64-encoded file.
 */
export const getFile = async (req = request, res = response, next) => {
  try {
    const { filename } = req.params;
    const { type } = req.query;
    const student = await serviceStudents.getVoucher(filename, type);
    if (student === undefined || student.name === null) {
      res.status(404).json({ msg: "No existe en el sistema" });
    } else {
      const file = await getFileBlob(student.name, nameContainer.proof);
      const typeFile = student.name.split(".")[1];
      res.json({ file, typeFile });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (req = request, res = response, next) => {
  try {
    const { filename } = req.params;
    const file = await deleteFileBlob(filename, nameContainer.proof);
    res.json({ file });
  } catch (error) {
    next(error);
  }
};

export const postFileInf = async (req = request, res = response, next) => {
  try {
    const arrayURL = await uploadFiPdf(req.files, nameContainer.information);
    Promise.all(arrayURL).then((response) => {
      res.json({ message: response });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteFiPdf = async (req = request, res = response, next) => {
  try {
    const { filename } = req.params;
    const file = await deleteFileBlob(filename, nameContainer.information);
    res.json({ file });
  } catch (error) {
    next(error);
  }
};
