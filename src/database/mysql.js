import { createConnection } from 'mysql2/promise';
import { config } from "./../config/index.js";

export const database = createConnection({
    host: config.hostDB,
    user: config.userDB,
    password: config.passDB,
    port: config.portDB,
    database: config.nameDB,
});

export const isDatabaseConnected = async () => {
    try {
        await (await database).query('SELECT 1');
        return true;
    } catch (error) {
        console.warn("cannot check database status");
        return false;
    }
}

export const closeConnectionDB = async () => (await database).end();