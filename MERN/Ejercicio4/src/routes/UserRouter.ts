import express, { Request, Response } from "express";
import { UserController } from "../controller/UserController";
import { LogInfo, LogSuccess } from "../utils/logger";

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

		// Devolver la respuesta al cliente
		return res.send(response);
	})
	.delete(async (req: Request, res: Response) => {
		// Obtiene la id de los parámetros
		let id: any = req?.query?.id;
		LogInfo(`Query param: ${id}`);

		// Instancia de controlador
		const controller: UserController = new UserController();

		// Obtener la respuesta
		const response: any = await controller.deleteUser(id);

		// Devolver la respuesta al cliente
		return res.send(response);
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

		// Devolver la respuesta al cliente
		return res.send(newUser);
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

		// Obtener la respuesta
		await controller.createUser(user).then((r) => {
			LogSuccess(`[/api/users] Crear usuario: ${user}`);
			response = {
				message: `¡El usuario ${user.name} añadido con éxito a la BD!`,
			};
		});

		// Devolver la respuesta al cliente
		return res.send(response);
	});


export default userRouter;
