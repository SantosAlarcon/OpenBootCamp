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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const KataController_1 = require("../controller/KataController");
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const logger_1 = require("../utils/logger");
const jwt = __importStar(require("jsonwebtoken"));
const User_Entity_1 = require("../domain/entities/User.Entity");
const Kata_Entity_1 = require("../domain/entities/Kata.Entity");
const mongoose_1 = __importDefault(require("mongoose"));
const Kata_orm_1 = require("../domain/orm/Kata.orm");
const jsonParser = body_parser_1.default.json();
// Routers
const kataRouter = express_1.default.Router();
kataRouter
    .route("/")
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    // Obtiene la id, nivel, pagina, limite y sortBy de los parámetros
    const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    const level = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.level;
    const sortBy = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.sortBy;
    const page = ((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.page) || 1;
    const limit = ((_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.limit) || 10;
    // Instancia de controlador
    const controller = new KataController_1.KataController();
    let response = "";
    if (id) {
        (0, logger_1.LogInfo)(`Query param: ${id}`);
        response = yield controller.getKata(id);
    }
    else if (level) {
        (0, logger_1.LogInfo)(`Query param: ${level}`);
        response = yield controller.getKatasByLevel(level);
    }
    else if (sortBy) {
        (0, logger_1.LogInfo)(`Query param: ${sortBy}`);
        response = yield controller.getKataSortedBy(sortBy);
    }
    else {
        response = yield controller.getAllKatas(page, limit);
    }
    // Devolver la respuesta al cliente
    return res.send(response);
}))
    .delete(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const token = req.headers["x-access-token"];
    const decoded = jwt.decode(token);
    let response;
    // Obtiene la id de los parámetros
    const id = (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.id;
    (0, logger_1.LogInfo)(`Query param: ${id}`);
    // Instancia de controlador
    const controller = new KataController_1.KataController();
    const userModel = (0, User_Entity_1.userEntity)();
    // Para obtener los datos del creador hay que consultar la base de datos por
    // el email y guardarlo en un objeto usuario.
    const usuario = Object.assign({}, (yield userModel.find({ email: decoded.email })))[0];
    // Se guarda el ID del creador/usuario actual en una variable
    const idUsuarioActual = usuario["_id"].toString();
    // Se obtiene el ID del creador del kata
    const creadorKata = yield controller.getKata(id);
    const idCreadorKata = creadorKata["creator"].toString();
    // Aquí se comprueba si el ID del usuario actual coincide con el del creador
    // del kata a borrar.
    if (idUsuarioActual === idCreadorKata) {
        // Se intenta borrar el kata
        yield controller.deleteKata(id).then((exito) => __awaiter(void 0, void 0, void 0, function* () {
            // Si se tiene éxito en el borrado del kata, se borra la ID del kata del array de katas del creador.
            if (exito) {
                // Se borra del array del creador del kata el ID kata borrado.
                yield userModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(idCreadorKata) }, {
                    $pull: {
                        katas: id,
                    },
                });
                (0, logger_1.LogSuccess)(`[/api/katas] Borrar kata: ${id}`);
                response = {
                    message: `¡El kata con ID ${id} se ha borrado con éxito a la BD!`,
                    status: 202,
                };
            }
        }));
    }
    else {
        response = {
            message: "Sólo el creador del kata puede borrarlo de la BD.",
            status: 400,
        };
    }
    // Devolver la respuesta al cliente
    return res.send(response).status(response.status);
}))
    .post(jsonParser, verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Se obtiene del token la información del usuario actual.
    const token = req.headers["x-access-token"];
    const decoded = jwt.decode(token);
    // Instancia de controlador y del modelo de usuario
    const controller = new KataController_1.KataController();
    const userModel = (0, User_Entity_1.userEntity)();
    const kataModel = (0, Kata_Entity_1.kataEntity)();
    let response = "";
    // Se obtienen los datos del req.body
    const { name, description, level, date, stars, chances, participants, solution, } = req.body;
    // Para obtener los datos del creador hay que consultar la base de datos por
    // el email y guardarlo en un objeto usuario.
    const usuario = Object.assign({}, (yield userModel.find({ email: decoded.email })))[0];
    // Se guarda el ID del creador/usuario actual en una variable
    const creator = usuario["_id"].toString();
    if (name &&
        description &&
        level &&
        creator &&
        date &&
        stars &&
        chances &&
        participants) {
        // Se crea un objeto con los datos que pasa el kata
        const newKata = {
            name: name,
            description: description,
            level: level,
            creator: creator,
            date: date,
            stars: stars,
            chances: chances,
            participants: participants,
            solution: solution,
        };
        // Obtener la respuesta
        yield controller.createKata(newKata).then((exito) => __awaiter(void 0, void 0, void 0, function* () {
            if (exito) {
                // Ahora se busca el ID del nuevo kata creado
                const createdKata = yield kataModel.find({ name: newKata.name });
                const idKata = createdKata[0]["_id"].toString();
                // Se añade al array del creador del kata el ID kata creado.
                yield userModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(creator) }, {
                    $push: {
                        katas: idKata,
                    },
                });
                (0, logger_1.LogSuccess)(`[/api/katas] Crear kata: ${newKata.name}`);
                response = {
                    message: `¡El kata <<${newKata.name}>> se ha añadido con éxito a la BD!`,
                };
            }
        }));
        // Devolver la respuesta al cliente y le envía el código 201 de recurso
        // creado.
        return res.send(response).status(201);
    }
    else {
        response = {
            message: "Debes introducir los campos obligatorios para poder crear un kata.",
        };
    }
    return response;
}))
    .put(jsonParser, verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    let response = "";
    const token = req.headers["x-access-token"];
    const decoded = jwt.decode(token);
    // Obtiene la id de los parámetros
    const id = (_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.id;
    (0, logger_1.LogInfo)(`Query param: ${id}`);
    // Se obtienen los datos del req.body
    const { name, description, level, date, stars, chances, participants, solution, } = req.body;
    // Instancia de controlador
    const controller = new KataController_1.KataController();
    const userModel = (0, User_Entity_1.userEntity)();
    // Para obtener los datos del creador hay que consultar la base de datos por
    // el email y guardarlo en un objeto usuario.
    const usuario = Object.assign({}, (yield userModel.find({ email: decoded.email })))[0];
    // Se guarda el ID del creador/usuario actual en una variable
    const idUsuarioActual = usuario["_id"].toString();
    // Se obtiene el ID del creador del kata
    const creadorKata = yield controller.getKata(id);
    const idCreadorKata = creadorKata["creator"].toString();
    if (id &&
        name &&
        description &&
        level &&
        date &&
        stars &&
        chances &&
        participants &&
        solution) {
        // Se crea un objeto con los datos que pasa el kata
        const newKata = {
            name: name,
            description: description,
            level: level,
            creator: idUsuarioActual,
            date: date,
            stars: stars,
            chances: chances,
            participants: participants,
            solution: solution,
        };
        // Aquí se comprueba si el ID del usuario actual coincide con el del creador
        // del kata a borrar.
        if (idUsuarioActual === idCreadorKata) {
            // Obtener la respuesta
            yield controller.updateKata(id, newKata).then((r) => {
                (0, logger_1.LogSuccess)(`[/api/katas] Modificar kata: ${newKata}`);
                response = {
                    message: `¡El kata ${newKata.name} se ha modificado con éxito!`,
                    status: 204,
                };
            });
        }
        else {
            response = {
                message: "Sólo el creador del kata puede actualizar la información de la BD.",
                status: 400,
            };
        }
    }
    else {
        response = {
            message: "Debes proporcionar el ID y los nuevos datos que quieres modificar.",
            status: 400,
        };
    }
    // Devolver la respuesta al cliente
    return res.send(response).status(response.status);
}));
// Ruta para puntuar katas
kataRouter.route("/rate")
    .post(jsonParser, verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    let response = "";
    const id = (_h = req === null || req === void 0 ? void 0 : req.query) === null || _h === void 0 ? void 0 : _h.id;
    const stars = (_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.stars;
    const token = req.headers["x-access-token"];
    const decoded = jwt.decode(token);
    // Se comprueba que el usuario ha introducido la ID de la kata y la
    // valoración es de 1 a 5.
    if (id && (stars > 0 && stars < 6)) {
        // Primero se obtiene el usuario que ha iniciado sesión y luego su ID.
        const userModel = (0, User_Entity_1.userEntity)();
        const usuario = Object.assign({}, (yield userModel.find({ email: decoded.email })))[0];
        const idUsuarioActual = usuario["_id"].toString();
        const newValoration = {
            id: idUsuarioActual,
            stars: stars
        };
        // Primero se comprueba si el usuario ya ha valorado previamente esta kata.
        const alreadyRated = yield (0, Kata_orm_1.kataRatedbyUser)(id, idUsuarioActual);
        const controller = new KataController_1.KataController();
        // Se añade la nueva valoración si el usuario no ha valorado previamente la kata.
        if (!alreadyRated) {
            yield controller.rateKata(id, newValoration).then((exito) => {
                if (exito) {
                    response = {
                        message: `${usuario.name} ha puntuado la kata con ID ${id} con ${stars} estrellas.`,
                        status: 201
                    };
                }
            });
            /*await kataModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, {
                $push: {
                    stars: newValoration
                }
            }).then((exito) => {

                if (exito) {
                    response = {
                        message: `${usuario.name} ha puntuado la kata con ID ${id} con ${stars} estrellas.`,
                        status: 201
                    }
                }

            })*/
        }
        else {
            response = {
                message: "Ya has votado a esta kata. Puntúa otra kata diferente.",
                status: 400
            };
        }
    }
    else {
        response = {
            message: "Debes introducir un valor entre 1 a 5 estrellas para puntuar la Kata",
            status: 400
        };
    }
    // Devuelve la respuesta del servidor y el código de estado.
    return res.send(response).status(response.status);
}));
kataRouter.route("/solve")
    .post(jsonParser, verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l;
    let response = "";
    const id = (_k = req === null || req === void 0 ? void 0 : req.query) === null || _k === void 0 ? void 0 : _k.id;
    const solution = (_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.solution;
    const token = req.headers["x-access-token"];
    const decoded = jwt.decode(token);
    const controller = new KataController_1.KataController();
    if (id && solution) {
        // Primero se obtiene el usuario que ha iniciado sesión y luego su ID.
        const userModel = (0, User_Entity_1.userEntity)();
        const usuario = Object.assign({}, (yield userModel.find({ email: decoded.email })))[0];
        const idUsuarioActual = usuario["_id"].toString();
        const kataActual = yield controller.getKata(id);
        yield (0, Kata_orm_1.solveKata)(id, idUsuarioActual).then((exito) => {
            if (exito) {
                (0, logger_1.LogSuccess)(`[/api/katas/solve] Resuelto kata ID ${id}.`);
                response = {
                    solucion: kataActual.solution,
                    status: 200
                };
            }
        });
    }
    else {
        response = {
            message: "Debes introducir la ID de la kata y su solución",
            status: 400
        };
    }
    return res.send(response).status(response.status);
}));
exports.default = kataRouter;
