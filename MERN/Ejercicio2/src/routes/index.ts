/**
 * Root Router
 * Redirecciones a routers
 */

import express, {Request, Response} from "express"
import { LogInfo } from "../utils/logger";
import helloRouter from "./HelloRouter";
import goodbyeRouter from "./GoodbyeRouter";

// Instancia del servidor
let server = express();

// Instancia del router
let rootRouter = express.Router();
 
// Endpoint GET
rootRouter.get("/", (req: Request, res: Response) => {
    LogInfo('GET: https://localhost:3000/api/')
    res.send("Bienvenido a mi API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose");
})

// Redirecciones a routers
server.use("/", rootRouter);
server.use("/hello", helloRouter);
server.use("/goodbye", goodbyeRouter);

export default rootRouter;
