import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import bcrypt from "bcrypt-ts";
import { IUser } from "../controller/interfaces/IUser.interface";
import { IAuthController } from "../controller/interfaces";
import { IAuth } from "../controller/interfaces/IAuth.interface";

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

export default authRouter;
