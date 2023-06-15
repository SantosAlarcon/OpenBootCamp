import express, {Express, Request, Response} from "express";

// Variables de entorno
import dotenv from "dotenv";

// Seguridad
import cors from "cors"
import helmet from "helmet"

// Root router
import rootRouter from "../routes"
import helloRouter from "../routes/HelloRouter";
import goodbyeRouter from "../routes/GoodbyeRouter";

// Configuración del archivo .env
dotenv.config();

// Crear instancia de Express
const server = express();

// Definir los endpoints de "/api" y "/api/hello"
server.use("/api", rootRouter);
server.use("/api/hello", helloRouter);
server.use("/api/goodbye", goodbyeRouter);

// Configuración de seguridad
server.use(helmet());
server.use(cors());

// Config tipo contenido | Límite de subida a 50 MB
server.use(express.urlencoded({extended: true, limit: '50mb'}))
server.use(express.json({limit: '50mb'}))

// Redirigir el endpoint principal a /api
server.get("/", (req: Request, res: Response) => {
    res.redirect("/api");
})

export default server;
