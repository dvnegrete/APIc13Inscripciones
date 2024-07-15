import { request, response } from 'express';
import UserService from "../services/userServices.js";
import { signToken } from '../utils/signToken.js';

const service = new UserService();

export const changeTokenUser = (req, res, next) => {
    try {
        const { id, email, nameComplete, username, role, } = req.body;
        const payload = { id, username, email, nameComplete, role, };
        const token = signToken(payload)
        res.cookie("token_jwt", token, {
            httpOnly: true,
            secure: false,
        })
        res.send({ ...payload, token });
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req = request, res = response, next) => {
    try {
        const users = await service.findUsers();
        res.send(users);
    } catch (error) {
        next(error)
    }
}

export const updateRoleUser = async (req = request, res = response, next) => {
    try {
        const { id } = req.params;
        const { role } = req.query;
        const update = await service.updateUser(Number(id), role);
        res.send({ update })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req = request, res = response, next) => {
    try {
        const { id } = req.params;
        const deleteUser = await service.deleteUser(id)
        res.send({ deleteUser })
    } catch (error) {
        next(error)
    }
}