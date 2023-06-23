import { Delete, Get, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogWarning } from "../utils/logger";
import { getAllUsers, getUserById, deleteUserById } from "../domain/orm/User.orm";

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

    /**
    * Endpoint que permite borrar un usuario de la BD.
    */
    @Delete("/")
    public async deleteUser(@Query() id?: string): Promise<any> {
        let response: any;

        if (id) {
            LogSuccess(`[/api/users] Borrando el usuario con el ID ${id}...`);
            response = await deleteUserById(id);
        } else {
            LogWarning("[/api/users] Tratando de borrar el usuario sin el ID...");
            response = {
                message: "Introduce una ID válida para borrar el usuario de la BD."
            }
        }

        return response;

    }
}
