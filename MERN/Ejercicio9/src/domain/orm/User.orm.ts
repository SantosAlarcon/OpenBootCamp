import { IUser } from "../../controller/interfaces/IUser.interface";
import { IAuth } from "../../controller/interfaces/IAuth.interface";
import { LogError, LogSuccess } from "../../utils/logger";
import { userEntity } from "../entities/User.Entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { kataEntity } from "../entities/Kata.Entity";
import { IKata } from "../../controller/interfaces/IKata.interface";
import mongoose, { ObjectId } from "mongoose";
configDotenv();

// Se obtiene la palabra secreta del process.env
const palabraSecreta = process.env.SECRETO || "MISECRETO"

// CRUD de usuarios

/**
 * Método para obtener todos los usuarios de la colección "usuarios" de la BD de MongoDB.
 */
export const getAllUsers = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    let userModel = userEntity();

    // En la respuesta se guardarán los usuarios, mostrando el total de páginas y la página actual.
    let response: any = {};

    // Se buscan todos los usuarios usando el límite.
    await userModel
      .find({})
      .select("name email age katas")
      .limit(limit)
      .skip((page - 1) * limit)
      .exec().then((users: IUser[]) => {

        response!.users = users;
      });

    // Se hace un recuento de la cantidad de documentos que hay en la colección de usuarios.
    await userModel.countDocuments().then((total: number) => {
      response!.totalPages = Math.ceil(total / limit);
      response!.currentPage = page;
    })

    return response;

  } catch (error) {
    LogError(`Error ORM a la hora de obtener los usuarios. ${error}`);
  }
};

export const getKatasFromUser = async (page: number, limit: number, id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    let kataModel = kataEntity();

    let response: any = {};

    await userModel.findById(id).then(async (usuario: IUser) => {
      response.user = usuario.name;
      response.email = usuario.email;

      let objectIds: mongoose.Types.ObjectId[] = [];

      // Iteramos sobre las katas
      usuario.katas.forEach((kataID: string) => {
        let objectId = new mongoose.Types.ObjectId(kataID);
        objectIds.push(objectId);
      })

      await kataModel.find({
        "_id": { "$in": objectIds }
      }).then((katas: IKata[]) => {
        response.katas = katas;
      })
    })

    return response;

  } catch (error) {
    LogError(`[ERROR ORM] Error a la hora de obtener los katas del usuario ${id}. ${error}.`)
  }
}

/**
 * Método para obtener la información de un sólo usuario.
 */
export const getUserById = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    return await userModel.findById(id).select("name email age katas");
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
