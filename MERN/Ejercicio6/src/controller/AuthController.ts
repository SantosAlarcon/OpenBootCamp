import { Post, Route, Tags, Query } from "tsoa";
import { LogSuccess, LogWarning } from "../utils/logger";
import { IAuthController } from "./interfaces";
import { IUser } from "./interfaces/IUser.interface";
import { IAuth } from "./interfaces/IAuth.interface";
import { loginUser, registerUser } from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("AuthController")
export class AuthController implements IAuthController {
    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {
        let response: any = "";

        if (user) {
            LogSuccess(`[/api/auth/register] Registrando nuevo usuario ${user.name}`)
            await registerUser(user).then((r: Response) => {
                response = {
                    message: `¡El usuario ${user.name} se ha registrado con éxito!`
                }
            });
        } else {
            LogWarning(`[/api/auth/register] Tratando de registrar usuario sin la información del mismo`);
            response = {
                message: "Es obligatoria la información del usuario para poder registrarlo."
            }
        }

        return response;
    }

    @Post("/login")
    public async loginUser(auth: IAuth): Promise<IAuth> {
        
        let response: any = "";

        if (auth) {
            LogSuccess(`[/api/login] Iniciando sesión del usuario ${auth.email}`)
            await loginUser(auth).then((r: any) => {
                response = {
                    message: `¡El usuario ${auth.email} ha iniciado sesión correctamente!`,
                    token: r.token
                }
            });
        } else {
            LogWarning(`[/api/login] Tratando de iniciar sesión sin la autenticación`);
            response = {
                message: "Es obligatorio autentificarse para iniciar sesión."
            }
        }

        return response;
    }

    @Post("/logout")
    public async logoutUser(): Promise<IAuth> {
        let response: any = "";

        return response;
    }
}
