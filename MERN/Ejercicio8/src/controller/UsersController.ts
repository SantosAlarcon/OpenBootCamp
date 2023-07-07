import { Body, Delete, Get, Put, Query, Route, Tags } from "tsoa";
import { deleteUserById, getAllUsers, getUserById, updateUserById } from "../domain/orm/User.orm";
import { LogSuccess, LogWarning } from "../utils/logger";
import { IUserController } from "./interfaces";

@Route("/api/users")
@Tags("UsersController")
export class UsersController implements IUserController {
  /**
   * Endpoint que devuelve la lista de usuarios.
   */
  @Get("/")
  public async getUsers(@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<any> {
    let response: any;

    if (id) {
      LogSuccess(`[/api/users] Obteniendo el usuario con el ID ${id}...`);
      response = await getUserById(id);
    } else {
      LogSuccess("[/api/users] Obteniendo todos los usuarios...");
      response = await getAllUsers(page, limit);
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

  /**
  * Endpoint que permite actualizar un usuario a la BD
  */
  @Put("/")
  public async updateUser(@Query() id: string, @Body() user: any): Promise<any> {
    let response: any = "";

    if (id) {
      LogSuccess(`[/api/users] Modificando los datos del usuario con ID ${id} ...`);
      await updateUserById(id, user).then((r) => {
        response = {
          message: `¡El usuario con ID ${id} se ha actualizado con éxito!`
        }
      });
    } else {
      LogWarning(`[/api/users] Tratando de actualizar datos sin la ID`);
      response = {
        message: `Debes proporcionar una ID para actualizar los datos.`
      }
    }


    return response;
  }
}
