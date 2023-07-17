import { IKata } from "../../controller/interfaces/IKata.interface";
import { LogError, LogInfo, LogSuccess } from "../../utils/logger";
import { kataEntity } from "../entities/Kata.Entity";
import { IKataValoration } from "../../controller/interfaces/IKata.interface";
import mongoose from "mongoose";

// CRUD de katas
/**
 * Método para obtener todos los katas de la colección "katas" de la BD de MongoDB.
 */
export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();

        let response: any = {};

        // Se buscan todos los katas usando el límite.
        await kataModel
            .find({})
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((katas: IKata[]) => {
                response!.katas = katas;
            });

        // Se hace un recuento de la cantidad de documentos que hay en la colección de katas.
        await kataModel.countDocuments().then((total: number) => {
            response!.totalPages = Math.ceil(total / limit);
            response!.currentPage = page;
        })

        return response;

    } catch (error) {
        LogError(`Error ORM a la hora de obtener los katas. ${error}`);
    }
};

/**
 * Método para obtener la información de un sólo kata.
 */
export const getKataById = async (id: string): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.findById(id);
    } catch (error) {
        LogError(`Error a la hora de obtener el kata. ${error}`);
    }
};

/**
 * Método para obtener la información de un sólo kata.
 */
export const getKatasByLevel = async (level: number): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.find({ level: level });
    } catch (error) {
        LogError(`Error a la hora de obtener el kata. ${error}`);
    }
};

/**
 * Método para obtener los katas ordenados por nivel
 */
export const getSortByLevel = async (): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.find({}).sort({ "level": -1 });
    } catch (error) {
        LogError(`Error a la hora de extraer la lista de katas ordenados por nivel. ${error}`);
    }
};

/**
 * Método para obtener los 5 katas más recientes de mayor a menor.
 */
export const getSortByDate = async (): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.find({}).sort({ "date": -1 }).limit(5);
    } catch (error) {
        LogError(`Error a la hora de extraer la lista de katas recientes. ${error}`);
    }
};

/**
 * Método para obtener los katas más valorados de mayor a menor.
 */
export const getSortByValoration = async (): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.find({}).sort({ "stars": -1 });
    } catch (error) {
        LogError(`Error a la hora de extraer la lista de katas más valorados. ${error}`);
    }
};

/**
 * Método para obtener los katas con más intentos de mayor a menor.
 */
export const getSortByTries = async (): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.find({}).sort({ "chances": -1 });
    } catch (error) {
        LogError(`Error a la hora de extraer la lista de katas más valorados. ${error}`);
    }
};

/**
 * Método para borrar un kata de la BD
 */
export const deleteKataById = async (id: string): Promise<any> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.deleteOne({ _id: id });
    } catch (error) {
        LogError(`Error a la hora de borrar el kata. ${error}`);
    }
};

/**
 * Método para crear un nuevo kata
 */
export const createNewKata = async (kata: IKata): Promise<any> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.create(kata)
            .then((r) => console.log("Kata creado con éxito"))
            .catch((error: Error) => console.error(error));
    } catch (error) {
        LogError(`Error a la hora de crear el kata. ${error}`);
    }
};

/**
 * Método para actualizar los datos de un kata a partir de la ID
 */
export const updateKataById = async (id: string, kata: IKata): Promise<any> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.findByIdAndUpdate(id, kata);
    } catch (error) {
        LogError(`Error a la hora de actualizar el kata. ${error}`);
    }
};

/**
 * Método para valorar una kata pasando una ID, en el que se 
 * guarda la ID del usuario que la puntua y la valoración.
 */

export const rateKataById = async (id: string, valoration: IKataValoration): Promise<any> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.updateOne({_id: new mongoose.Types.ObjectId(id)}, {
            $push: {
                stars: valoration
            }
        })

    } catch (error) {
        LogError(`Error a la hora de valorar la kata.`)
    }
}

/**
 * Método que devuelve si un usuario ya ha puntuado una kata.
 */
export const kataRatedbyUser = async (kataID: string, userId: string): Promise<any> => {
    try {
        let kataModel = kataEntity();

        return await kataModel.findById(kataID)
        .where("stars")
        .elemMatch({"id": userId})
    } catch (error) {
        LogError(`[Error ORM]: No se pudo encontrar el usuario dentro de las valoraciones.`);
    }
}

/**
 * Método que permite resolver una kata
 */
export const solveKata = async(kataID: string, userID: string): Promise<any> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.updateOne({_id: new mongoose.Types.ObjectId(kataID)}, {
            $push: {
                participants: userID
            }
        })
    } catch (error) {
        LogError(`[Error ORM]: No se pudo guardar la solución de la kata en la BD`);
    }
}
