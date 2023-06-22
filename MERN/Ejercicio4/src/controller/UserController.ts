import { Get, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogInfo } from "../utils/logger";
import { getAllUsers } from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    /**
     * Endpoint que devuelve la lista de usuarios.
     */
    @Get("/")
    public async getUsers(@Query() id?: string): Promise<any> {

        LogInfo(`${id}`);

        const response: any = "";

        if (id) {
            return {
                message: `Obteniendo datos del usuario ${id}`
            }
        } else {
            LogSuccess("[/api/users] Obteniendo todos los usuarios...");
            const response = await getAllUsers();
            return response;
        }

    }

    /**
    * Endpoint que devuelve la información de un usuario a partir de la ID.
    */
    @Get("/")
    public async getUserByID(@Query() id?: string): Promise<any> {
        LogSuccess(`[/api/users] Obteniendo datos del usuario con ID ${id}`);

        return {
            message: `Obteniendo los datos del usuario con el ID ${id}`
        }
    }
}
