import { app } from "./app.js";
import { config } from "./config/index.js";

app.listen(config.port, () => console.log("Servidor en el puerto ", config.port));