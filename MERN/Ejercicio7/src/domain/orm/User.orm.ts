import { IUser } from "../../controller/interfaces/IUser.interface";
import { IAuth } from "../../controller/interfaces/IAuth.interface";
import { LogError, LogSuccess } from "../../utils/logger";
import { userEntity } from "../entities/User.Entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

// Se obtiene la palabra secreta del process.env
const palabraSecreta = process.env.SECRETO || "MISECRETO"

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
export const registerNewUser = async (user: IUser): Promise<any> => {
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

    let usuarioEncontrado: IUser | undefined = undefined;

    let token = undefined;

    // Se intenta buscar el usuario por el email en la BD.
    await userModel.findOne({ email: auth.email })
      .then((usuario: IUser) => {
        usuarioEncontrado = usuario;

      }).catch((error) => {
        LogError(`[ERROR ORM] El usuario ${auth.email} no existe en la BD.`);
        throw new Error(`${error}`)
      })

    // Se comprueba si la contraseña es correcta descifrandola.
    let validPassword = bcrypt.compareSync(auth.password, usuarioEncontrado!.password);

    // En caso de que la contraseña es correcta, se genera un token válido para 2h.
    if (validPassword) {
      token = jwt.sign({ email: usuarioEncontrado!.email }, palabraSecreta, {
        expiresIn: "2h"
      })
    } else {
      throw new Error(`[ERROR AUTH EN ORM]: La contraseña no es válida.`)
    }

    return {
      user: usuarioEncontrado,
      token: token
    }

  } catch {
    LogError("[ERROR AUTH ORM]: No se ha podido iniciar sesión.")
  }
}

/**
 * Método para cerrar sesión
 */
export const logoutUser = async (auth: IAuth): Promise<any> => {

}
