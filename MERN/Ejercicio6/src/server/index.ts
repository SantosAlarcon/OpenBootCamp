import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import server from "../routes";
import { rootRouter } from "../routes";

// Swagger
import swaggerUI from "swagger-ui-express"

// Variables de entorno
import "dotenv/config";

// Seguridad
import cors from "cors"
import helmet from "helmet"

// Crear instancia de Express
//const server: Express = express();

// Carga la ruta raíz que permite cargar el resto.
server.use("/api", rootRouter);

// Servidor estático
server.use(express.static("public"));

console.log(`MONGO URI: ${process.env.MONGO_URI}`)

// Conectar a la BD de MongoDB
mongoose.connect(process.env.MONGO_URI);

// Configuración de seguridad
server.use(helmet());
server.use(cors());

// Config tipo contenido | Límite de subida a 50 MB
server.use(express.json({ limit: '50mb' }))
server.use(express.urlencoded({ extended: true, limit: '50mb' }))

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
