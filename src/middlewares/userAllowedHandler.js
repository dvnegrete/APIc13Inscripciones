import { unauthorized } from "@hapi/boom";
import UsersService from "../services/userServices.js";

const service = new UsersService();

export const userAllowedHandler = async (req, res, next) => {
    try {
        const { upn: username } = req.body;
        let user = await service.findOneUser(username);
        if (!user) {
            const addUser = await service.addUserDefault(req.body);
            addUser === 1 ?
            user = await service.findOneUser(username) :
            user = null;
        }        
        req.body = {
            ...req.body,
            ...user,
        }
        next();
    } catch (error) {
        throw unauthorized();
    }
}