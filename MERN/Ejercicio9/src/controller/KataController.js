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
exports.KataController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
const Kata_orm_1 = require("../domain/orm/Kata.orm");
let KataController = exports.KataController = class KataController {
    /**
     * Endpoint que devuelve un kata a partir del ID.
     */
    getAllKatas(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            (0, logger_1.LogSuccess)(`[/api/katas] Obteniendo todos los katas de la BD.`);
            response = yield (0, Kata_orm_1.getAllKatas)(page, limit);
            return response;
        });
    }
    /**
     * Endpoint que devuelve un kata a partir del ID.
     */
    getKata(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            (0, logger_1.LogSuccess)(`[/api/katas] Obteniendo el kata con el ID ${id}...`);
            response = yield (0, Kata_orm_1.getKataById)(id);
            return response;
        });
    }
    /**
     * Endpoint que devuelve la lista de katas ordenadas por X criterio.
     */
    getKataSortedBy(sortedBy) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (sortedBy) {
                switch (sortedBy) {
                    case "level":
                        (0, logger_1.LogSuccess)(`[/api/katas] Mostrando los katas ordenados por nivel.`);
                        response = yield (0, Kata_orm_1.getSortByLevel)();
                        break;
                    case "date":
                        (0, logger_1.LogSuccess)(`[/api/katas] Mostrando las 5 katas más recientes.`);
                        response = yield (0, Kata_orm_1.getSortByDate)();
                        break;
                    case "stars":
                        (0, logger_1.LogSuccess)(`[/api/katas] Mostrando los katas ordenados por valoración de mayor a menor.`);
                        response = yield (0, Kata_orm_1.getSortByValoration)();
                        break;
                    case "chances":
                        (0, logger_1.LogSuccess)(`[/api/katas] Mostrando los katas ordenados por intentos de mayor a menor.`);
                        response = yield (0, Kata_orm_1.getSortByTries)();
                        break;
                }
                return response;
            }
        });
    }
    /**
    * Endpoint que devuelve una lista de katas en función de su dificultad.
    */
    getKatasByLevel(level) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logger_1.LogSuccess)(`[/api/katas] Obteniendo la lista de katas de nivel de dificultad ${level}`);
            let response = "";
            if (level) {
                response = yield (0, Kata_orm_1.getKatasByLevel)(level);
                return response;
            }
        });
    }
    /**
    * Endpoint que permite borrar un kata de la BD.
    */
    deleteKata(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/katas] Borrando el kata con el ID ${id} ...`);
                response = yield (0, Kata_orm_1.deleteKataById)(id);
            }
            else {
                (0, logger_1.LogWarning)("[/api/katas] Tratando de borrar el kata sin el ID...");
                response = {
                    message: "Introduce una ID válida para borrar el kata de la BD."
                };
            }
            return response;
        });
    }
    /**
    * Endpoint que permite añadir un kata a la BD
    */
    createKata(kata) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (kata) {
                (0, logger_1.LogSuccess)(`[/api/katas] Añadiendo nuevo kata ...`);
                yield (0, Kata_orm_1.createNewKata)(kata).then((r) => {
                    (0, logger_1.LogSuccess)(`[/api/katas]: Kata creado`);
                    response = {
                        message: `El kata ${kata.name} se ha creado con éxito.`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)("[/api/katas] El Kata necesita los datos del kata");
                response = {
                    message: "Debes proporcionar los datos del kata para poder crearlo."
                };
            }
            return response;
        });
    }
    /**
     * Endpoint que permite puntuar una kata del 1 al 5, y se guarda la valoración del
     * usuario.
     */
    rateKata(id, stars) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                if (stars > 5 || stars < 1) {
                    (0, logger_1.LogWarning)(`[api/katas/rate] Valorando un kata con un valor fuera de rango.`);
                    response = {
                        message: "Debes introducir un valor entre 1 y 5 estrellas."
                    };
                }
                else {
                    (0, logger_1.LogSuccess)(`[api/katas/rate] Añadiendo nueva puntuación al kata...`);
                    yield (0, Kata_orm_1.rateKataById)(id, stars).then((exito) => {
                        if (exito) {
                            (0, logger_1.LogSuccess)(`[api/katas/rate] El kata con ID ${id} ha recibido nueva puntuación.`);
                            response = {
                                message: `El kata con ID ${id} ha recibido una nueva valoración de ${stars} estrellas.`
                            };
                        }
                    });
                }
            }
            else {
                (0, logger_1.LogWarning)(`[api/katas/rate] Valorando nuevo kata sin la ID y la valoración`);
                response = {
                    message: "Debes introducir la ID del kata y la puntuación de la misma."
                };
            }
            return response;
        });
    }
    /**
    * Endpoint que permite actualizar un kata a la BD
    */
    updateKata(id, kata) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "";
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/katas] Modificando los datos del kata con ID ${id} ...`);
                yield (0, Kata_orm_1.updateKataById)(id, kata).then((r) => {
                    response = {
                        message: `¡El kata con ID ${id} se ha actualizado con éxito!`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)(`[/api/katas] Tratando de actualizar datos sin la ID`);
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
    __param(1, (0, tsoa_1.Query)())
], KataController.prototype, "getAllKatas", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)())
], KataController.prototype, "getKata", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)())
], KataController.prototype, "getKataSortedBy", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)())
], KataController.prototype, "getKatasByLevel", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)())
], KataController.prototype, "deleteKata", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)())
], KataController.prototype, "createKata", null);
__decorate([
    (0, tsoa_1.Post)("/rate"),
    __param(0, (0, tsoa_1.Query)("id")),
    __param(1, (0, tsoa_1.Body)())
], KataController.prototype, "rateKata", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)("id")),
    __param(1, (0, tsoa_1.Body)())
], KataController.prototype, "updateKata", null);
exports.KataController = KataController = __decorate([
    (0, tsoa_1.Route)("/api/katas"),
    (0, tsoa_1.Tags)("KataController")
], KataController);
