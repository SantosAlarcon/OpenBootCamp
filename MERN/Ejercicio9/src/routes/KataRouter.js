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
let jsonParser = body_parser_1.default.json();
// Routers
let kataRouter = express_1.default.Router();
kataRouter
    .route("/")
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    // Obtiene la id, nivel, pagina, limite y sortBy de los parámetros
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    let level = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.level;
    let sortBy = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.sortBy;
    let page = ((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.page) || 1;
    let limit = ((_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.limit) || 10;
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
    let token = req.headers["x-access-token"];
    let decoded = jwt.decode(token);
    let response;
    // Obtiene la id de los parámetros
    let id = (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.id;
    (0, logger_1.LogInfo)(`Query param: ${id}`);
    // Instancia de controlador
    const controller = new KataController_1.KataController();
    const userModel = (0, User_Entity_1.userEntity)();
    // Para obtener los datos del creador hay que consultar la base de datos por
    // el email y guardarlo en un objeto usuario.
    const usuario = Object.assign({}, yield userModel.find({ email: decoded.email }))[0];
    // Se guarda el ID del creador/usuario actual en una variable
    const idUsuarioActual = usuario["_id"].toString();
    const creadorKata = Object.assign({}, yield controller.getKata(id));
    console.log(creadorKata);
    // Aquí se comprueba si el ID del usuario actual coincide con el del creador
    // del kata a borrar.
    if (idUsuarioActual === creadorKata) {
        // Obtener la respuesta
        response = yield controller.deleteKata(id);
        response.status = 202;
    }
    else {
        response = {
            message: "Sólo el creador del kata puede borrarlo de la BD.",
            status: 400
        };
    }
    // Devolver la respuesta al cliente
    return res.send(response).status(response.status);
}))
    .post(jsonParser, verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers["x-access-token"];
    let decoded = jwt.decode(token);
    // Instancia de controlador y del modelo de usuario
    const controller = new KataController_1.KataController();
    const userModel = (0, User_Entity_1.userEntity)();
    let response = "";
    // Se obtienen los datos del req.body
    const { name, description, level, date, stars, chances, participants } = req.body;
    // Para obtener los datos del creador hay que consultar la base de datos por
    // el email y guardarlo en un objeto usuario.
    const usuario = Object.assign({}, yield userModel.find({ email: decoded.email }))[0];
    // Se guarda el ID del creador/usuario actual en una variable
    const creator = usuario["_id"].toString();
    if (name && description && level && creator && date && stars && chances && participants) {
        // Se crea un objeto con los datos que pasa el kata
        const newKata = {
            name: name,
            description: description,
            level: level,
            creator: creator,
            date: date,
            stars: stars,
            chances: chances,
            participants: participants
        };
        // Obtener la respuesta
        yield controller.createKata(newKata).then((r) => {
            (0, logger_1.LogSuccess)(`[/api/katas] Crear kata: ${newKata.name}`);
            response = {
                message: `¡El kata ${newKata.name} se ha añadido con éxito a la BD!`,
            };
        });
        // Devolver la respuesta al cliente y le envía el código 201 de recurso
        // creado.
        return res.send(newKata).status(201);
    }
    else {
        response = {
            message: "Debes introducir los campos obligatorios para poder crear un kata."
        };
    }
    return response;
}))
    .put(jsonParser, verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = "";
    let id = req.query.id;
    // Se obtienen los datos del req.body
    const { name, description, level, creator, date, stars, chances, participants } = req.body;
    if (id && name && description && level && creator && date && stars && chances && participants) {
        // Se crea un objeto con los datos que pasa el kata
        const newKata = {
            name: name,
            description: description,
            level: level,
            creator: creator,
            date: date,
            stars: stars,
            chances: chances,
            participants: participants
        };
        // Instancia de controlador
        const controller = new KataController_1.KataController();
        // Obtener la respuesta
        yield controller.updateKata(id, newKata).then((r) => {
            (0, logger_1.LogSuccess)(`[/api/katas] Modificar kata: ${newKata}`);
            response = {
                message: `¡El kata ${newKata.name} se ha modificado con éxito!`,
            };
        });
    }
    else {
        response = {
            message: "Debes proporcionar el ID y los nuevos datos que quieres modificar."
        };
    }
    // Devolver la respuesta al cliente
    return res.send(response);
}));
exports.default = kataRouter;
