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
exports.getUserById = exports.getAllUsers = void 0;
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
        return yield userModel.find({ isDelete: false });
    }
    catch (error) {
        (0, logger_1.LogError)(`Error ORM a la hora de obtener los usuarios. ${error}`);
    }
});
exports.getAllUsers = getAllUsers;
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
// PENDIENTE
// GetId, GetEmail, Delete, Update, Create
