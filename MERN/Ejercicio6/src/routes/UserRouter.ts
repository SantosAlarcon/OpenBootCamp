import express, { Request, Response } from "express";
import { UsersController } from "../controller/UsersController";
import { LogInfo, LogSuccess, LogWarning } from "../utils/logger";
import * as bcrypt from "bcrypt"

// Routers
let userRouter = express.Router();

userRouter
    .route("/")
    .get(async (req: Request, res: Response) => {
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
    .delete(async (req: Request, res: Response) => {
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
    .post(async (req: Request, res: Response) => {
        // Instancia de controlador
        const controller: UsersController = new UsersController();

        const name = req?.query?.name;
        const email = req?.query?.email;
        const age = req?.query?.age;

        // Se crea un objeto con los datos que pasa el usuario
        const newUser = { name: name, email: email, age: age };

        let response: any = "";

        // Obtener la respuesta
        await controller.createUser(newUser).then((r: Response) => {
            LogSuccess(`[/api/users] Crear usuario: ${newUser}`);
            response = {
                message: `¡El usuario ${newUser.name} añadido con éxito a la BD!`,
            };
        });

        // Devolver la respuesta al cliente y el código de estado 201.
        return res.send(newUser).status(201);
    })
    .put(async (req: Request, res: Response) => {
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

<<<<<<< HEAD
    // Devolver la respuesta al cliente y el código de estado 201.
    return res.send(newUser).status(201);
  })
  .put(async (req: Request, res: Response) => {
    // Obtiene la id de los parámetros
    let id: any = req?.query?.id;
    LogInfo(`Query param: ${id}`);

    // Instancia de controlador
    const controller: UserController = new UserController();

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

=======
>>>>>>> 8e523229e7c1c6f9b251fe8568a0213a267ca630
export default userRouter;
