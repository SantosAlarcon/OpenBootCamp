import {BasicResponse} from "../types"

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}
export interface IUserController {
    // Obtener todos los usuarios de la BD de MongoDB
    getUsers(): Promise<any>
    getUserByID(id: string): Promise<any>
}
