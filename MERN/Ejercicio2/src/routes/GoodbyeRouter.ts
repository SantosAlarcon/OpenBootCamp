import express, {Request, Response } from "express"
import { LogInfo } from "../utils/logger";
import { GoodbyeController } from "../controller/GoodbyeController";

// Routers
let goodbyeRouter = express.Router();

goodbyeRouter.route("/").get(async(req: Request, res: Response) => {
    // Obtener parámetros query
    let name: any = req?.query?.name;
    LogInfo(`Query param: ${name}`)

    // Instancia de controlador
    const controller: GoodbyeController = new GoodbyeController();

    // Obtener la respuesta
    const response = await controller.getMessage(name);

    // Devolver la respuesta al cliente
    return res.send(response);
})

export default goodbyeRouter;
