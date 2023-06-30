<<<<<<< HEAD
import * as bcrypt from "bcrypt";
import express from "express";
import { IUser } from "../controller/interfaces/IUser.interface";
import { IAuthController } from "../controller/interfaces";
import { IAuth } from "../controller/interfaces/IAuth.interface";
import { AuthController } from "../controller/AuthController";

const authRouter = express.Router();

authRouter.route("/auth/register")
  .post(async (req: Request, res: Response) => {

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

    const controller: AuthController = new AuthController();

    const response: any = await controller.register(newUser);

  })
=======
import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IUser } from "../controller/interfaces/IUser.interface";
import { IAuthController } from "../controller/interfaces";
import { IAuth } from "../controller/interfaces/IAuth.interface";
import * as bcrypt from "bcrypt";

let authRouter = express.Router();

authRouter.route("/auth/register")
    .post(async (req: Request, res: Response) => {

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

        const controller: IAuthController = new AuthController();

        const response: any = await controller.registerUser(newUser);

        return res.send(response).status(200);

    })

authRouter.route("/auth/login")
    .post(async (req: Request, res: Response) => {

        let { email, password } = req.body;


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
>>>>>>> 8e523229e7c1c6f9b251fe8568a0213a267ca630

export default authRouter;
