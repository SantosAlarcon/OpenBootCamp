import dotenv from "dotenv"
import server from "./src/server"
import {LogSuccess, LogError} from "./src/utils/logger"

// Configuración del archivo .env
dotenv.config();

const port = process.env.PORT || 8000

// Ejecutar el servidor
server.listen(port, () => {
    LogSuccess(`Servidor funcionando en http://localhost:${port}/api`)
})

server.on("error", () => {
    LogError(`No se ha podido arrancar el servidor.`);
})
