import {BasicResponse} from "../types"

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}
export interface IUserController {
    // Obtener todos los usuarios de la BD de MongoDB
    getUsers(id?: string): Promise<any>

    // Borrar un usuario de la BD
    deleteUser(id?: string): Promise<any>

    // Crear un usuario
    createUser(user: any): Promise<any>

    // Actualizar un usuario
    updateUser(id: string, user: any): Promise<any>
}
