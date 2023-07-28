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
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
const User_orm_1 = require("../domain/orm/User.orm");
let AuthController = exports.AuthController = class AuthController {
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (user) {
                (0, logger_1.LogSuccess)(`[/api/auth/register] Registrando nuevo usuario ${user.name}`);
                yield (0, User_orm_1.registerNewUser)(user).then((r) => {
                    response = {
                        message: `¡El usuario ${user.name} se ha registrado con éxito!`,
                        token: r.token,
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)(`[/api/auth/register] Tratando de registrar usuario sin la información del mismo`);
                response = {
                    message: "Es obligatoria la información del usuario para poder registrarlo.",
                    token: "No válido",
                };
            }
            return response;
        });
    }
    loginUser(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (auth) {
                (0, logger_1.LogSuccess)(`[/api/auth/login] Iniciando sesión del usuario ${auth.email}`);
                let data = yield (0, User_orm_1.loginUser)(auth);
                if (data) {
                    response = {
                        token: data.token,
                        message: `Bienvenid@ a la aplicación, ${data.user.name}`,
                    };
                }
            }
            else {
                (0, logger_1.LogWarning)(`[/api/auth/login] Se requiere introducir el email y la contraseña`);
                response = {
                    message: "Es obligatorio proporcionar el email y la contraseña para iniciar sesión.",
                    token: "No se ha podido autenticar el usuario.",
                };
            }
            return response;
        });
    }
    /**
     * Endpoint que devuelve la información de un usuario.
     * Middleware: validación mediante JWT
     * En la cabecera debes añadir una cabecera con "x-access-token"
     * @param id El ID del usuario
     * @returns La información del usuario con ese ID
     */
    userData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/auth/me] Obteniendo datos del usuario con el ID ${id}.`);
                response = yield (0, User_orm_1.getUserById)(id);
            }
            return response;
        });
    }
    logoutUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            return response;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("/register"),
    __param(0, (0, tsoa_1.Body)())
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, tsoa_1.Post)("/login"),
    __param(0, (0, tsoa_1.Body)())
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, tsoa_1.Get)("/me"),
    __param(0, (0, tsoa_1.Query)())
], AuthController.prototype, "userData", null);
__decorate([
    (0, tsoa_1.Post)("/logout")
], AuthController.prototype, "logoutUser", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("/api/auth"),
    (0, tsoa_1.Tags)("AuthController")
], AuthController);
