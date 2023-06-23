import { Get, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogInfo } from "../utils/logger";
import { getAllUsers, getUserById } from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    /**
     * Endpoint que devuelve la lista de usuarios.
     */
    @Get("/")
    public async getUsers(@Query() id?: string): Promise<any> {
        let response: any;

        if (id) {
            LogSuccess(`[/api/users] Obteniendo el usuario con el ID ${id}...`);
            response = await getUserById(id);
        } else {
            LogSuccess("[/api/users] Obteniendo todos los usuarios...");
            response = await getAllUsers();
        }

        return response;
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
