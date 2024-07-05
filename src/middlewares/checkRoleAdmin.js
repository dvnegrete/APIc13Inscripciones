import { unauthorized } from "@hapi/boom";
import { roles } from "../models/tablesDB.model.js";
import { decode } from "./decodeToken.js";

export const checkRoleAdmin = (req, res, next) => {
    const { role } = decode(req.headers.authorization);
    if (role === roles.admin) {
        next();
    } else{
        throw unauthorized();
    }
}