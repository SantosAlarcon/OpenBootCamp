import { userEntity } from "../entities/userEntity";
import {LogError, LogSuccess} from "../../utils/logger";

// CRUD de usuarios
/**
 * Método para obtener todos los usuarios de la colección "usuarios" de la BD de MongoDB.
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
    try {
       let userModel = userEntity();

        // Buscar todos los usuarios
        return await userModel.find({isDelete: false});
    } catch (error) {
        LogError("Error ORM a la hora de obtener los usuarios.");
    }
}

// PENDIENTE
// GetId, GetEmail, Delete, Update, Create
