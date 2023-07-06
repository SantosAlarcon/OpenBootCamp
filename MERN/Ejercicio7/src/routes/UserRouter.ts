import express, { Request, Response } from "express";
import { UsersController } from "../controller/UsersController";
import { LogInfo, LogSuccess, LogWarning } from "../utils/logger";
import bodyParser from "body-parser"
import { verifyToken } from "../middlewares/verifyToken.middleware";

let jsonParser = bodyParser.json();

// Routers
let userRouter = express.Router();

userRouter
  .route("/")
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtiene la id de los parámetros
    let id: any = req?.query?.id;
    LogInfo(`Query param: ${id}`);

    // Instancia de controlador
    const controller: UsersController = new UsersController();

    // Obtener la respuesta
    const response: any = await controller.getUsers(id);

    // Devolver la respuesta al cliente y el código de estado.
    return res.send(response).status(200);
  })
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtiene la id de los parámetros
    let id: any = req?.query?.id;
    LogInfo(`Query param: ${id}`);

    let response: any = "";

    // Instancia de controlador
    const controller: UsersController = new UsersController();

    if (id) {
      LogSuccess(`[/api/users] Borrando usuario con el ID ${id}`);
      // Obtener la respuesta
      await controller.deleteUser(id).then((r) => {
        response = {
          status: 204,
          message: `¡Se ha borrado el usuario con el id ${id}!`,
        };
      });

    } else {
      LogWarning(`[/api/users] Tratando de borrar el usuario sin el ID.`);
      response = {
        status: 400,
        message: "No se puede borrar el usuario sin el ID. Debes proporcionar uno."
      }
    }
    // Devolver la respuesta al cliente y el código de estado.
    return res.send(response).status(response.status);
  })
  .put(verifyToken, jsonParser, async (req: Request, res: Response) => {
    // Obtiene la id de los parámetros
    let id: any = req?.query?.id;
    LogInfo(`Query param: ${id}`);

    // Instancia de controlador
    const controller: UsersController = new UsersController();

    // Se crea un objeto con los datos que pasa el usuario
    let user = req.body;

    console.log(user);

    let response: any = "";

    if (id) {
      LogSuccess(`[/api/users] Actualizando usuario con el ID ${id}`);
      // Obtener la respuesta
      await controller.updateUser(id, user).then((r) => {
        response = {
          status: 204,
          message: `¡El usuario ${user.name} añadido con éxito a la BD!`,
        };
      });

    } else {
      LogWarning(`[/api/users] Tratando de actualizar el usuario sin el ID.`);
      response = {
        status: 400,
        message: "No se puede actualizar el usuario sin el ID. Debes proporcionar uno."
      }
    }

    // Devolver la respuesta al cliente
    return res.status(response.status).send(response);
  });

export default userRouter;
