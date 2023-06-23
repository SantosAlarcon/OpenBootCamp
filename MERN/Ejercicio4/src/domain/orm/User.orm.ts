import { LogError, LogSuccess } from "../../utils/logger";
import { userEntity } from "../entities/User.Entity";

// CRUD de usuarios
/**
 * Método para obtener todos los usuarios de la colección "usuarios" de la BD de MongoDB.
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        // Buscar todos los usuarios
        return await userModel.find({});
    } catch (error) {
        LogError(`Error ORM a la hora de obtener los usuarios. ${error}`);
    }
}

/**
 * Método para obtener la información de un sólo usuario.
 */
export const getUserById = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.findById(id)
    } catch (error) {
        LogError(`Error a la hora de obtener el usuario. ${error}`);
    }
}

/**
 * Método para borrar un usuario de la BD
 */
export const deleteUserById = async (id: string): Promise<any> => {
    try {
        let userModel = userEntity();
        return await userModel.deleteOne({_id: id})
    } catch (error) {
        LogError(`Error a la hora de borrar el usuario. ${error}`); 
    }
}

// PENDIENTE
// GetId, GetEmail, Delete, Update, Create
