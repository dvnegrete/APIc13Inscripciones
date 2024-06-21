//import { use } from "passport";
//const { use } = require("passport");
import { unauthorized } from "@hapi/boom";
//const boom = require("@hapi/boom");
import { Strategy } from "passport-local";
//const { Strategy } = require("passport-local");
import ControlStudents from "./../../../services/controlStudentsService.js";
//const ControlStudents = require("./../../../services/controlStudentsService");

const service = new ControlStudents();

export const LocalStrategy = new Strategy(async (username, password, done) => {
    try {
        const userID = await service.checkAccess(username, password)
        if (!userID.id) {
            throw unauthorized();
        } else {
            //userID es recibido en el siguiente next como req.user
            done(null, userID);
        }
    } catch (error) {
        done(error)
    }
});

//module.exports = LocalStrategy;