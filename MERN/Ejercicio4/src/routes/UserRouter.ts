import express, {Request, Response } from "express"
import {UserController} from "../controller/UserController";
import { LogInfo } from "../utils/logger";

// Routers
let userRouter = express.Router();

userRouter.route("/").get(async(req: Request, res: Response) => {
    
    // Instancia de controlador
    const controller: UserController = new UserController();

    // Obtener la respuesta
    const response: any = await controller.getUsers();

    // Devolver la respuesta al cliente
    return res.send(response);   
})

export default userRouter;
