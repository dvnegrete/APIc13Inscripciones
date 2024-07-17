import { request, response } from "express";
import ControlStudentsService from "../services/controlStudentsService.js";
import Students from "../services/studentsServices.js";

const serviceControl = new ControlStudentsService();
const serviceStudents = new Students();

//query parameter "user" para la curp. Example: /listBlobs/comprobantes?CURPSTUDENT
//container = "informacion" or "comprobantes"
export const getListBlobs = async (req = request, res = response, next) => {
  try {
    const { container } = req.params;
    const list = await serviceControl.listBlobs(container);
    if (req.query.user) {
      const listUser = serviceControl.findBlobUser(list, req.query.user);
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
    const { user } = req.query;
    if (user) {
      const studentRecord = await serviceStudents.getDataDB(user);
      res.json({ studentRecord });
    } else {
      res.json({ msg: "not User" });
    }
  } catch (error) {
    next(error);
  }
};

export const getFile = async (req = request, res = response, next) => {
  try {
    const { filename } = req.params;
    const file = await serviceControl.getFileBlob(filename);
    res.json(file);
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (req = request, res = response, next) => {
  try {
    const { filename } = req.params;
    const file = await serviceControl.deleteFileBlob(filename);
    res.json({ file });
  } catch (error) {
    next(error);
  }
};

export const postFileInformation = async (
  req = request,
  res = response,
  next
) => {
  try {
    const arrayURL = await serviceControl.uploadFiPdf(req.files);
    Promise.all(arrayURL).then((response) => {
      res.json({ message: response });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
