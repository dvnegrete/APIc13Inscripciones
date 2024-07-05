import { internal } from "@hapi/boom";
import { database, closeConnectionDB } from "../database/mysql.js";
import { roles, tablesDB } from "../models/tablesDB.model.js";

export default class User {
    constructor() { }

    async findUsers() {
        const querySQL = `SELECT * FROM ${tablesDB.users}`;
        try {
            const [results,] = await (await database).execute(querySQL);
            return results;
        } catch (error) {
            throw internal(error)
        } finally {
            await closeConnectionDB();
        }
    }

    async findOneUser(username) {
        const querySQL = `SELECT * FROM ${tablesDB.users} WHERE email = ?`;
        try {
            const [results,] = await (await database).execute(querySQL, [username]);
            if (results.length === 1) {
                const { id, email, nameComplete, role, username } = results[0];
                return { id, email, nameComplete, role, username, };
            }
            return false;
        } catch (error) {
             throw internal(error)
        } finally {
            await closeConnectionDB();
        }
    }

    async addUserDefault(body) {
        try {
            const { upn: email, name: nameComplete, given_name: username } = body;
            const querySQL = `INSERT INTO ${tablesDB.users}(email, nameComplete, role, username)
            VALUES (?, ?, ?, ?)`;
            const [result] = await (await database).execute(querySQL, [email, nameComplete, roles.notFunctions, username])
            return result.affectedRows;
        } catch (error) {
             throw internal(error)
        } finally {
            await closeConnectionDB();
        }
    }

    async updateUser(id, role) {
        try {
            const querySQL = `UPDATE ${tablesDB.users} SET role = ? WHERE id = ?`;
            const [result] = await (await database).execute(querySQL, [role, id]);
            return result.affectedRows > 0;
        } catch (error) {
             throw internal(error)
        } finally {
            await closeConnectionDB();
        }
    }

    async deleteUser(id) {
        try {
            const querySQL = `DELETE FROM ${tablesDB.users} WHERE id = ?`;
            const [result] = await (await database).execute(querySQL, [id]);
            return result;
        } catch (error) {
             throw internal(error)
        } finally {
            await closeConnectionDB();
        }
    }

}