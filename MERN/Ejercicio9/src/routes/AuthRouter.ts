import * as bcrypt from "bcrypt";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IAuthController } from "../controller/interfaces";
import { IAuth } from "../controller/interfaces/IAuth.interface";
import { IUser } from "../controller/interfaces/IUser.interface";
import { AuthResponse } from "../controller/types";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { LogInfo } from "../utils/logger";

let jsonParser = bodyParser.json();

let authRouter = express.Router();

authRouter.route("/register")
  .post(jsonParser, async (req: Request, res: Response) => {

    // Se extraen los campos importantes del req.body
    let { name, email, age, password, katas } = req?.body;

    let hashedPassword = "";

    // Si están todos los campos, se procede a generar una contraseña cifrada con 8 pases.
    if (password && name && email && age && katas) {
      hashedPassword = bcrypt.hashSync(req.body.password, 8)

      let newUser: IUser = {
        name,
        email,
        age,
        password: hashedPassword,
        katas
      }

      const controller: IAuthController = new AuthController();

      const response: any = await controller.registerUser(newUser);

      return res.send(response).status(200);
    } else {
      return res.status(400).send({
        message: "Debes proporcionar todos los campos: name, password, age, email y katas."
      })
    }


  })

authRouter.route("/login")
  .post(jsonParser, async (req: Request, res: Response) => {

    let { email, password } = req?.body;

    console.log(req.body)

    if (password && email) {

      const controller: IAuthController = new AuthController();

      let auth: IAuth = {
        email: email,
        password: password
      }

      const response: any = await controller.loginUser(auth);

      // Envía la respuesta al cliente con el token AWT
      return res.send(response).status(200);
    } else {
      return res.status(400).send({
        message: "Debes introducir email y contraseña"
      })
    }

  })

// Ruta protegida por el middleware JWT
authRouter.route("/me")
  .get(verifyToken, async (req: Request, res: Response) => {

    // Se obtiene el ID del usuario
    let id: any = req?.query?.id;

    if (id) {

      // Se crea una instancia del AuthController
      const controller: AuthController = new AuthController();

      // Se obtiene la respuesta del controlador
      let response: any = controller.userData(id);

      // En caso de que la verificación sea válida se envía la respuesta con el código 200.
      return res.status(200).send(response);
    } else {
      return res.status(401).send({
        message: `No estás autorizado para utilizar esta ruta.`
      })
    }
  })

export default authRouter;
