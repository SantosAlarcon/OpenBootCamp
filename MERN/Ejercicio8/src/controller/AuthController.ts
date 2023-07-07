import { Post, Route, Tags, Get, Query, Path, Body } from "tsoa";
import { LogSuccess, LogWarning } from "../utils/logger";
import { IAuthController } from "./interfaces";
import { IUser } from "./interfaces/IUser.interface";
import { IAuth } from "./interfaces/IAuth.interface";
import { getUserById, loginUser, registerNewUser } from "../domain/orm/User.orm";
import { AuthResponse } from "./types";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("/register")
  public async registerUser(@Body() user: IUser): Promise<any> {
    let response: AuthResponse | undefined;

    if (user) {
      LogSuccess(`[/api/auth/register] Registrando nuevo usuario ${user.name}`)
      await registerNewUser(user).then((r: any) => {
        response = {
          message: `¡El usuario ${user.name} se ha registrado con éxito!`,
          token: r.token
        }
      });
    } else {
      LogWarning(`[/api/auth/register] Tratando de registrar usuario sin la información del mismo`);
      response = {
        message: "Es obligatoria la información del usuario para poder registrarlo.",
        token: "No válido"
      }
    }

    return response;
  }

  @Post("/login")
  public async loginUser(@Body() auth: IAuth): Promise<AuthResponse> {

    let response: AuthResponse | undefined;

    if (auth) {
      LogSuccess(`[/api/auth/login] Iniciando sesión del usuario ${auth.email}`)
      let data = await loginUser(auth);
      response = {
        token: data.token,
        message: `Bienvenid@ a la aplicación, ${data.user.name}`
      }
    } else {
      LogWarning(`[/api/auth/login] Se requiere introducir el email y la contraseña`);
      response = {
        message: "Es obligatorio proporcionar el email y la contraseña para iniciar sesión.",
        token: "No se ha podido autenticar el usuario."
      }
    }

    return response;
  }

  /**
  * Endpoint que devuelve la información de un usuario.
  * Middleware: validación mediante JWT
  * En la cabecera debes añadir una cabecera con "x-access-token"
  * @param id El ID del usuario
  * @returns La información del usuario con ese ID
  */
  @Get("/me")
  public async userData(@Query() id: string): Promise<any> {
    let response: any = "";

    if (id) {
      LogSuccess(`[/api/auth/me] Obteniendo datos del usuario con el ID ${id}.`);
      response = await getUserById(id);

      // Se borra la contraseña para que se quede en el backend.
      response.password = "";
    }

  }

  @Post("/logout")
  public async logoutUser(): Promise<IAuth> {
    let response: any = "";

    return response;
  }
}
