import { createConnection } from 'mysql2/promise';
import { config } from "./../config/index.js";

export const database = createConnection({
    host: config.hostDB,
    user: config.userDB,
    password: config.passDB,
    port: config.portDB,
    database: config.nameDB,
});