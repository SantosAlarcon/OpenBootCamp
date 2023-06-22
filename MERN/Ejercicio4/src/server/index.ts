import express, {Express, Request, Response} from "express";
import mongoose from "mongoose";

// Swagger
import swaggerUI from "swagger-ui-express"

// Variables de entorno
import dotenv from "dotenv";

// Seguridad
import cors from "cors"
import helmet from "helmet"

// Root router
import rootRouter from "../routes"

// Routers
import helloRouter from "../routes/HelloRouter";
import userRouter from "../routes/UserRouter";

// Configuración del archivo .env
dotenv.config();

// Crear instancia de Express
const server = express();

// Definir los endpoints
server.use("/api", rootRouter);
server.use("/api/hello", helloRouter);
server.use("/api/users", userRouter);

// Servidor estático
server.use(express.static("public"));

// Conectar a la BD de MongoDB
mongoose.connect("mongodb://santos:santos@192.168.43.139:27017/codeverification");

// Configuración de seguridad
server.use(helmet());
server.use(cors());

// Config tipo contenido | Límite de subida a 50 MB
server.use(express.urlencoded({extended: true, limit: '50mb'}))
server.use(express.json({limit: '50mb'}))

// Configuración y ruta de Swagger
server.use(
    '/docs',
    swaggerUI.serve,
    swaggerUI.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
            explorer: true
        }
    })
)

// Redirigir el endpoint principal a /api
server.get("/", (req: Request, res: Response) => {
    res.redirect("/api");
})

export default server;
