/**
 * Root Router
 * Redirecciones a routers
 */
import express, { Request, Response } from "express"
import { LogInfo } from "../utils/logger";
import helloRouter from "./HelloRouter";
import userRouter from "./UserRouter";
import authRouter from "./AuthRouter";
import kataRouter from "./KataRouter";

let server = express();

// Instancia del router
export let rootRouter = express.Router();

// Endpoint GET
rootRouter.get("/", (req: Request, res: Response) => {
  LogInfo('GET: http://localhost:8000/api/')
  res.send("Bienvenido a mi API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose");
})

// Redirecciones a routers
server.use("/", rootRouter);
server.use("/hello", helloRouter);
server.use("/users", userRouter);
server.use("/katas", kataRouter);
server.use("/auth", authRouter);

export default server;
