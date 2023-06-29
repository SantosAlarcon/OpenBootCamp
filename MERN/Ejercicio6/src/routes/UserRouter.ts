import express, { Request, Response } from "express";
import { UserController } from "../controller/UserController";
import { LogInfo, LogSuccess, LogWarning } from "../utils/logger";
import bcrypt from "bcrypt"
import { createNewUser } from "../domain/orm/User.orm";
import { IUser } from "../controller/interfaces/IUser.interface";

// Routers
let userRouter = express.Router();

userRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    // Obtiene la id de los parámetros
    let id: any = req?.query?.id;
    LogInfo(`Query param: ${id}`);

    // Instancia de controlador
    const controller: UserController = new UserController();

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
    const controller: UserController = new UserController();

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
    const controller: UserController = new UserController();

    const name = req?.query?.name;
    const email = req?.query?.email;
    const age = req?.query?.age;

    // Se crea un objeto con los datos que pasa el usuario
    const newUser = { name: name, email: email, age: age };

    let response: any = "";

    // Obtener la respuesta
    await controller.createUser(newUser).then((r) => {
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

userRouter.route("/auth/register")
  .post(async (req: Request, response: Response) => {

    let { name, email, age, password } = req.body;

    let hashedPassword = "";

    if (password && name && email && age) {
      hashedPassword = bcrypt.hashSync(req.body.password, 8)
    }

    let newUser: IUser = {
      name,
      email,
      age,
      password: hashedPassword
    }

    const controller: UserController = new UserController();

    const response: any = await controller.register(newUser);

  })


export default userRouter;
