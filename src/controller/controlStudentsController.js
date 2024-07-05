import { request, response } from 'express';
import ControlStudentsService from "../services/controlStudentsService.js";

const service = new ControlStudentsService();

//query parameter "user" para la curp. Example: /listBlobs/comprobantes?CURPSTUDENT
//container = "informacion" or "comprobantes"
export const getListBlobs = async (req= request, res=response, next) => {
    try {
        const { container } = req.params
        const list = await service.listBlobs(container);
        console.log(list.length);
        if (req.query.user) {
            const listUser = service.findBlobUser(list, req.query.user);
            res.json({ message: listUser })
        } else {
            res.json({ message: list });
        }
    } catch (error) {
        next(error)
    }
}

export const getFile = async (req= request, res=response, next) => {
    try {
        const { filename } = req.params;
        const file = await service.getFileBlob(filename);
        res.json(file);
    } catch (error) {
        next(error);
    }
}

export const postFileInformation =  async (req= request, res=response, next) => {
    try {
        const arrayURL = await service.uploadFiPdf(req.files);
        Promise.all(arrayURL).then(response => {
            res.json({ message: response });
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}