import { internal } from "@hapi/boom";
import { database } from "../database/mysql.js";
import { roles } from "../models/tablesDB.model.js";
import { sequelize } from "../libs/sequelize.js";
import {
  createUserDefaultQuery,
  deleteUserQuery,
  getUserForEmailQuery,
  updateUserQuery,
} from "../queries/user.queries.js";

const { models } = sequelize;

export const findUsers = async () => {
  try {
    return models.Users.findAll();
  } catch (error) {
    throw internal(error);
  }
};

export const findOneUser = async (username) => {
  try {
    const [results] = await (
      await database
    ).execute(getUserForEmailQuery, [username]);
    if (results.length === 1) {
      const { id, email, nameComplete, role, username } = results[0];
      return { id, email, nameComplete, role, username };
    }
    return false;
  } catch (error) {
    throw internal(error);
  }
};

export const addUserDefault = async (body) => {
  try {
    const { upn: email, name: nameComplete, given_name: username } = body;
    const date = new Date();
    const [result] = await (
      await database
    ).execute(createUserDefaultQuery, [
      email,
      nameComplete,
      roles.notFunctions,
      username,
      date,
      date,
    ]);
    return result.affectedRows;
  } catch (error) {
    throw internal(error);
  }
};

export const updateUser = async (id, role) => {
  try {
    const [result] = await (
      await database
    ).execute(updateUserQuery, [role, id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw internal(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const [result] = await (await database).execute(deleteUserQuery, [id]);
    return result;
  } catch (error) {
    throw internal(error);
  }
};
