import { Get, Query, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
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

    public async getUserByID(@Query() id?: string): Promise<any> {
        LogSuccess(`[/api/users] Obteniendo datos del usuario con ID ${id}`);

        return {
            message: `Obteniendo usuario con el `
        }
    }
}
