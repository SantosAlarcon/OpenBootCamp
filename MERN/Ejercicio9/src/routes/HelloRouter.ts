import express, {Request, Response } from "express"
import {HelloController} from "../controller/HelloController";
import { LogInfo } from "../utils/logger";

// Routers
let helloRouter = express.Router();

helloRouter.route("/").get(async(req: Request, res: Response) => {
    // Obtener parámetros query
    let name: any = req?.query?.name;
    LogInfo(`Query param: ${name}`)

    // Instancia de controlador
    const controller: HelloController = new HelloController();

    // Obtener la respuesta
    const response = await controller.getMessage(name);

    // Devolver la respuesta al cliente
    return res.send(response);
})

export default helloRouter;
