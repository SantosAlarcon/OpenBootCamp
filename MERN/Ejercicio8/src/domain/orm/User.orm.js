"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerNewUser = exports.updateUserById = exports.createNewUser = exports.deleteUserById = exports.getUserById = exports.getAllUsers = void 0;
const logger_1 = require("../../utils/logger");
const User_Entity_1 = require("../entities/User.Entity");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
// Se obtiene la palabra secreta del process.env
const palabraSecreta = process.env.SECRETO || "MISECRETO";
// CRUD de usuarios
/**
 * Método para obtener todos los usuarios de la colección "usuarios" de la BD de MongoDB.
 */
const getAllUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_Entity_1.userEntity)();
        // En la respuesta se guardarán los usuarios, mostrando el total de páginas y la página actual.
        let response = {};
        // Se buscan todos los usuarios usando el límite.
        yield userModel
            .find({})
            .select("name email age")
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((users) => {
            response.users = users;
        });
        // Se hace un recuento de la cantidad de documentos que hay en la colección de usuarios.
        yield userModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`Error ORM a la hora de obtener los usuarios. ${error}`);
    }
});
exports.getAllUsers = getAllUsers;
/**
 * Método para obtener la información de un sólo usuario.
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_Entity_1.userEntity)();
        return yield userModel.findById(id).select("name email age");
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de obtener el usuario. ${error}`);
    }
});
exports.getUserById = getUserById;
/**
 * Método para borrar un usuario de la BD
 */
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_Entity_1.userEntity)();
        return yield userModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de borrar el usuario. ${error}`);
    }
});
exports.deleteUserById = deleteUserById;
/**
 * Método para crear un nuevo usuario
 */
const createNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_Entity_1.userEntity)();
        return yield userModel.create(user)
            .then((r) => console.log("Usuario creado con éxito"))
            .catch((error) => console.error(error));
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de borrar el usuario. ${error}`);
    }
});
exports.createNewUser = createNewUser;
/**
 * Método para actualizar los datos de un usuario a partir de la ID
 */
const updateUserById = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_Entity_1.userEntity)();
        return yield userModel.findByIdAndUpdate(id, user);
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de actualizar el usuario. ${error}`);
    }
});
exports.updateUserById = updateUserById;
/**
 * Método para registrar usuario
 */
const registerNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_Entity_1.userEntity)();
        return yield userModel.create(user);
    }
    catch (error) {
        (0, logger_1.LogError)(`Error del ORM a la hora de crear el usuario ${user.name}. ${error}`);
    }
});
exports.registerNewUser = registerNewUser;
/**
 * Método para iniciar sesión
 */
const loginUser = (auth) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_Entity_1.userEntity)();
        let usuarioEncontrado = undefined;
        let token = undefined;
        // Se intenta buscar el usuario por el email en la BD.
        yield userModel.findOne({ email: auth.email })
            .then((usuario) => {
            usuarioEncontrado = usuario;
        }).catch((error) => {
            (0, logger_1.LogError)(`[ERROR ORM] El usuario ${auth.email} no existe en la BD.`);
            throw new Error(`${error}`);
        });
        // Se comprueba si la contraseña es correcta descifrandola.
        let validPassword = bcrypt.compareSync(auth.password, usuarioEncontrado.password);
        // En caso de que la contraseña es correcta, se genera un token válido para 2h.
        if (validPassword) {
            token = jwt.sign({ email: usuarioEncontrado.email }, palabraSecreta, {
                expiresIn: "2h"
            });
        }
        else {
            throw new Error(`[ERROR AUTH EN ORM]: La contraseña no es válida.`);
        }
        return {
            user: usuarioEncontrado,
            token: token
        };
    }
    catch (_a) {
        (0, logger_1.LogError)("[ERROR AUTH ORM]: No se ha podido iniciar sesión.");
    }
});
exports.loginUser = loginUser;
/**
 * Método para cerrar sesión
 */
const logoutUser = (auth) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.logoutUser = logoutUser;
