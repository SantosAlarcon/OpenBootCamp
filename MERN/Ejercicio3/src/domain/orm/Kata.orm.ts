import {LogError, LogSuccess} from "../../utils/logger";
import { kataEntity } from "../entities/kata.Entity";

// CRUD de usuarios
/**
 * Método para obtener todos los usuarios de la colección "usuarios" de la BD de MongoDB.
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
    try {
       let kataModel = kataEntity();

        // Buscar todos los usuarios
        return await kataModel.find({isDelete: false});
    } catch (error) {
        LogError("Error ORM a la hora de obtener los usuarios.");
    }
}

// PENDIENTE
// GetId, GetEmail, Delete, Update, Create
