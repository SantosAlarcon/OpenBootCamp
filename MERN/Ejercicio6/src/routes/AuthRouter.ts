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

export default authRouter;
