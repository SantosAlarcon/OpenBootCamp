import { BasicResponse } from "../types"
import { IUser } from "./IUser.interface"

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>
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
export interface IKataController {
  // Obtener todos los katas de la BD de MongoDB
  getKata(id?: string): Promise<any>

  // Borrar un kata de la BD
  deleteKata(id?: string): Promise<any>

  // Crear un nuevo kata
  createKata(kata: any): Promise<any>

  // Actualizar un kata existente
  updateKata(id: string, kata: any): Promise<any>
}

export interface IAuthController {
  registerUser(user: IUser): Promise<any>
  loginUser(auth: any): Promise<any>
}
