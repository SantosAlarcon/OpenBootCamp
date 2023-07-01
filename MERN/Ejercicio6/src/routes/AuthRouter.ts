import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IUser } from "../controller/interfaces/IUser.interface";
import { IAuthController } from "../controller/interfaces";
import { IAuth } from "../controller/interfaces/IAuth.interface";
import * as bcrypt from "bcrypt";
import { LogInfo } from "../utils/logger";
import bodyParser from "body-parser";

let jsonParser = bodyParser.json();

let authRouter = express.Router();

authRouter.route("/register")
  .post(jsonParser, async (req: Request, res: Response) => {

    let { name, email, age, password } = req?.body;

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

    LogInfo(`La contraseña cifrada es: ${newUser.password}`);

    const controller: IAuthController = new AuthController();

    const response: any = await controller.registerUser(newUser);

    return res.send(response).status(200);

  })

authRouter.route("/login")
  .post(jsonParser, async (req: Request, res: Response) => {

    let { email, password } = req.body;

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
    }

  })

export default authRouter;
