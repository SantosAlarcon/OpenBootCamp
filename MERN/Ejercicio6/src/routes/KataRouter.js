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
// Routers
let kataRouter = express_1.default.Router();
kataRouter
    .route("/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h, _j, _k, _l;
    // Instancia de controlador
    const controller = new KataController_1.KataController();
    const name = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.name;
    const description = (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.desc;
    const level = (_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.level;
    const creator = (_h = req === null || req === void 0 ? void 0 : req.query) === null || _h === void 0 ? void 0 : _h.creator;
    const date = (_j = req === null || req === void 0 ? void 0 : req.query) === null || _j === void 0 ? void 0 : _j.date;
    const stars = (_k = req === null || req === void 0 ? void 0 : req.query) === null || _k === void 0 ? void 0 : _k.stars;
    const chances = (_l = req === null || req === void 0 ? void 0 : req.query) === null || _l === void 0 ? void 0 : _l.chances;
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
    let response = "";
    // Obtener la respuesta
    yield controller.createKata(newKata).then((r) => {
        (0, logger_1.LogSuccess)(`[/api/katas] Crear kata: ${newKata.name}`);
        response = {
            message: `¡El kata ${newKata.name} se ha añadido con éxito a la BD!`,
        };
    });
    // Devolver la respuesta al cliente
    return res.send(newKata);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m;
    // Obtiene la id de los parámetros
    let id = (_m = req === null || req === void 0 ? void 0 : req.query) === null || _m === void 0 ? void 0 : _m.id;
    (0, logger_1.LogInfo)(`Query param: ${id}`);
    // Instancia de controlador
    const controller = new KataController_1.KataController();
    // Se crea un objeto con los datos que pasa el kata
    let kata = req.body;
    console.log(kata);
    let response = "";
    // Obtener la respuesta
    yield controller.createKata(kata).then((r) => {
        (0, logger_1.LogSuccess)(`[/api/katas] Crear kata: ${kata}`);
        response = {
            message: `¡El kata ${kata.name} añadido con éxito a la BD!`,
        };
    });
    // Devolver la respuesta al cliente
    return res.send(response);
}));
exports.default = kataRouter;
