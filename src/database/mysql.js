import { createPool } from 'mysql2/promise';
import { config } from "./../config/index.js";

export const database = createPool({
    host: config.hostDB,
    user: config.userDB,
    password: config.passDB,
    port: config.portDB,
    database: config.nameDB,
    waitForConnections: true,
    connectionLimit: 5,
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