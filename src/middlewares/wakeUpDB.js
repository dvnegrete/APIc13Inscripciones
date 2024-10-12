import { serverUnavailable } from "@hapi/boom";
import { database } from "../database/mysql.js";

export const wakeUpDB = async (req, res, next) => {
  const maxRetries = 2;
  const retryDelay = 1000;
  const tryConnect = async (attempt = 1) => {
    try {
      await database.query("SELECT 1");
      next();
    } catch (error) {
      console.warn("DB inactive, WAKE... attemp", attempt);
      if (attempt < maxRetries) {
        setTimeout( async() =>await tryConnect(attempt + 1), retryDelay);
      } else {
        return next(error);
        // return next(serverUnavailable());
      }
    }
  };
  tryConnect();
};
