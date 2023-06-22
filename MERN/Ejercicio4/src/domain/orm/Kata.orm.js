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
exports.GetAllUsers = void 0;
const logger_1 = require("../../utils/logger");
const Kata_Entity_1 = require("../entities/Kata.Entity");
// CRUD de usuarios
/**
 * Método para obtener todos los usuarios de la colección "usuarios" de la BD de MongoDB.
 */
const GetAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        // Buscar todos los usuarios
        return yield kataModel.find({ isDelete: false });
    }
    catch (error) {
        (0, logger_1.LogError)("Error ORM a la hora de obtener los usuarios.");
    }
});
exports.GetAllUsers = GetAllUsers;
// PENDIENTE
// GetId, GetEmail, Delete, Update, Create
