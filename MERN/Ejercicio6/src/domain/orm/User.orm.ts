import { IUser } from "../../controller/interfaces/IUser.interface";
import { IAuth } from "../../controller/interfaces/IAuth.interface";
import { LogError, LogSuccess } from "../../utils/logger";
import { userEntity } from "../entities/User.Entity"0;
import bcrypt from "bcrypt-ts";
import jwt, { Jwt } from "jsonwebtoken";

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
};

/**
 * Método para obtener la información de un sólo usuario.
 */
export const getUserById = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.findById(id);
    } catch (error) {
        LogError(`Error a la hora de obtener el usuario. ${error}`);
    }
};

/**
 * Método para borrar un usuario de la BD
 */
export const deleteUserById = async (id: string): Promise<any> => {
    try {
        let userModel = userEntity();
        return await userModel.deleteOne({ _id: id });
    } catch (error) {
        LogError(`Error a la hora de borrar el usuario. ${error}`);
    }
};

/**
 * Método para crear un nuevo usuario
 */
export const createNewUser = async (user: any): Promise<any> => {
    try {
        let userModel = userEntity();
        return await userModel.create(user)
            .then((r) => console.log("Usuario creado con éxito"))
            .catch((error) => console.error(error));
    } catch (error) {
        LogError(`Error a la hora de borrar el usuario. ${error}`);
    }
};

/**
 * Método para actualizar los datos de un usuario a partir de la ID
 */
export const updateUserById = async (id: string, user: any): Promise<any> => {
    try {
        let userModel = userEntity();
        return await userModel.findByIdAndUpdate(id, user);
    } catch (error) {
        LogError(`Error a la hora de actualizar el usuario. ${error}`);
    }
};

/**
 * Método para registrar usuario
 */
export const registerUser = async (user: IUser): Promise<any> => {
    try {
        let userModel = userEntity();

        return await userModel.create(user);
    } catch (error) {
        LogError(`Error del ORM a la hora de crear el usuario ${user.name}. ${error}`)
    }
}

/**
 * Método para iniciar sesión
 */
export const loginUser = async (auth: IAuth): Promise<any> => {
    try {
        let userModel = userEntity();
        userModel.findOne({email: auth.email}, (error: any, user: IUser) => {
            if (error) {
                LogError(`El usuario ${auth.email} no existe en la BD.`)
            }

            if (!user) {
                LogError(`El usuario ${auth.email} no existe en la BD.`)
            }

            // Utiliza BCrypt para comparar la contraseña.
            let validPassword = bcrypt.compareSync(auth.password, user.password);

            // Si la contraseña no es válida
            if (!validPassword) {
                // Se envia un error 401 - NO AUTORIZADO
            }

            // La palabra secreta estará guardada en el archivo .env para descifrar
            // la contraseña.
            let token = jwt.sign({email: user.email},"SECRET", {
                expiresIn: "2h"
            });

            return token;
        })

    } catch {

    }
}

/**
 * Método para cerrar sesión
 */
export const logoutUser = async (auth: IAuth): Promise<any> => {

}
