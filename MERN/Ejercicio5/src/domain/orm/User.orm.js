"use strict";
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
exports.updateUserById = exports.createNewUser = exports.deleteUserById = exports.getUserById = exports.getAllUsers = void 0;
const logger_1 = require("../../utils/logger");
const User_Entity_1 = require("../entities/User.Entity");
// CRUD de usuarios
/**
 * Método para obtener todos los usuarios de la colección "usuarios" de la BD de MongoDB.
 */
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_Entity_1.userEntity)();
        // Buscar todos los usuarios
        return yield userModel.find({});
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
        return yield userModel.findById(id);
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
