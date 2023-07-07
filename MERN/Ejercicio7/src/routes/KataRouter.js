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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const KataController_1 = require("../controller/KataController");
const logger_1 = require("../utils/logger");
const body_parser_1 = __importDefault(require("body-parser"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
let jsonParser = body_parser_1.default.json();
// Routers
let kataRouter = express_1.default.Router();
kataRouter
    .route("/")
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Obtiene la id de los parámetros
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    let level = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.level;
    let sortBy = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.sortBy;
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
        response = yield controller.getAllKatas();
    }
    // Devolver la respuesta al cliente
    return res.send(response);
}))
    .delete(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    // Obtiene la id de los parámetros
    let id = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.id;
    (0, logger_1.LogInfo)(`Query param: ${id}`);
    // Instancia de controlador
    const controller = new KataController_1.KataController();
    // Obtener la respuesta
    const response = yield controller.deleteKata(id);
    // Devolver la respuesta al cliente
    return res.send(response);
}))
    .post(verifyToken_middleware_1.verifyToken, jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Instancia de controlador
    const controller = new KataController_1.KataController();
    let response = "";
    // Se obtienen los datos del req.body
    const { name, description, level, creator, date, stars, chances } = req.body;
    if (name && description && level && creator && date && stars && chances) {
        // Se crea un objeto con los datos que pasa el kata
        const newKata = {
            name: name,
            description: description,
            level: level,
            creator: creator,
            date: date,
            stars: stars,
            chances: chances,
        };
        (0, logger_1.LogInfo)(`{newKata}`);
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
    .put(verifyToken_middleware_1.verifyToken, jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = "";
    // Se obtienen los datos del req.body
    const { id, name, description, level, creator, date, stars, chances } = req.body;
    if (id && name && description && level && creator && date && stars && chances) {
        // Se crea un objeto con los datos que pasa el kata
        const newKata = {
            name: name,
            description: description,
            level: level,
            creator: creator,
            date: date,
            stars: stars,
            chances: chances,
        };
        // Instancia de controlador
        const controller = new KataController_1.KataController();
        // Se crea un objeto con los datos que pasa el kata
        let kata = req.body;
        console.log(kata);
        // Obtener la respuesta
        yield controller.updateKata(id, newKata).then((r) => {
            (0, logger_1.LogSuccess)(`[/api/katas] Modificar kata: ${kata}`);
            response = {
                message: `¡El kata ${kata.name} se ha modificado con éxito!`,
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
