"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UsersController = void 0;
const tsoa_1 = require("tsoa");
const User_orm_1 = require("../domain/orm/User.orm");
const logger_1 = require("../utils/logger");
let UsersController = exports.UsersController = class UsersController {
    /**
     * Endpoint que devuelve la lista de usuarios.
     */
    getUsers(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/users] Obteniendo el usuario con el ID ${id}...`);
                response = yield (0, User_orm_1.getUserById)(id);
            }
            else {
                (0, logger_1.LogSuccess)("[/api/users] Obteniendo todos los usuarios...");
                response = yield (0, User_orm_1.getAllUsers)(page, limit);
            }
            return response;
        });
    }
    /**
     * Endpoint que devuelve los katas de un usuario
     */
    getKatasByUser(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/users/katas] Obteniendo las katas del usuario con el ID ${id}...`);
                yield (0, User_orm_1.getKatasFromUser)(page, limit, id).then((katas) => {
                    (0, logger_1.LogSuccess)(`[/api/users/katas] Se han encontrado las katas del usuario ${id}...`);
                    response = katas;
                });
            }
            else {
                (0, logger_1.LogWarning)("[/api/users/katas] No se ha pasado el ID de usuario...");
                response = {
                    message: "Debes proporcionar el ID para consultar todas las katas de X usuario."
                };
            }
            return response;
        });
    }
    /**
    * Endpoint que devuelve la información de un usuario a partir de la ID.
    */
    getUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logger_1.LogSuccess)(`[/api/users] Obteniendo datos del usuario con ID ${id}`);
            return {
                message: `Obteniendo los datos del usuario con el ID ${id}`
            };
        });
    }
    /**
    * Endpoint que permite borrar un usuario de la BD.
    */
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/users] Borrando el usuario con el ID ${id}...`);
                response = yield (0, User_orm_1.deleteUserById)(id);
            }
            else {
                (0, logger_1.LogWarning)("[/api/users] Tratando de borrar el usuario sin el ID...");
                response = {
                    message: "Introduce una ID válida para borrar el usuario de la BD."
                };
            }
            return response;
        });
    }
    /**
    * Endpoint que permite actualizar un usuario a la BD
    */
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/users] Modificando los datos del usuario con ID ${id} ...`);
                yield (0, User_orm_1.updateUserById)(id, user).then((r) => {
                    response = {
                        message: `¡El usuario con ID ${id} se ha actualizado con éxito!`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)(`[/api/users] Tratando de actualizar datos sin la ID`);
                response = {
                    message: `Debes proporcionar una ID para actualizar los datos.`
                };
            }
            return response;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)())
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, tsoa_1.Get)("/katas"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)())
], UsersController.prototype, "getKatasByUser", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)())
], UsersController.prototype, "getUserByID", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)())
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)())
], UsersController.prototype, "updateUser", null);
exports.UsersController = UsersController = __decorate([
    (0, tsoa_1.Route)("/api/users"),
    (0, tsoa_1.Tags)("UsersController")
], UsersController);
