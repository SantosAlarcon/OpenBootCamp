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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controller/UsersController");
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const logger_1 = require("../utils/logger");
let jsonParser = body_parser_1.default.json();
// Routers
let userRouter = express_1.default.Router();
userRouter
    .route("/")
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Obtiene la id, pagina y límite de los parámetros
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    let page = ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
    let limit = ((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.limit) || 10;
    (0, logger_1.LogInfo)(`Query param: ${id}`);
    // Instancia de controlador
    const controller = new UsersController_1.UsersController();
    // Obtener la respuesta
    const response = yield controller.getUsers(page, limit, id);
    // Devolver la respuesta al cliente y el código de estado.
    return res.send(response).status(200);
}))
    .delete(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    // Obtiene la id de los parámetros
    let id = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.id;
    (0, logger_1.LogInfo)(`Query param: ${id}`);
    let response = "";
    // Instancia de controlador
    const controller = new UsersController_1.UsersController();
    if (id) {
        (0, logger_1.LogSuccess)(`[/api/users] Borrando usuario con el ID ${id}`);
        // Obtener la respuesta
        yield controller.deleteUser(id).then((r) => {
            response = {
                status: 204,
                message: `¡Se ha borrado el usuario con el id ${id}!`,
            };
        });
    }
    else {
        (0, logger_1.LogWarning)(`[/api/users] Tratando de borrar el usuario sin el ID.`);
        response = {
            status: 400,
            message: "No se puede borrar el usuario sin el ID. Debes proporcionar uno."
        };
    }
    // Devolver la respuesta al cliente y el código de estado.
    return res.send(response).status(response.status);
}))
    .put(verifyToken_middleware_1.verifyToken, jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    // Obtiene la id de los parámetros
    let id = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.id;
    (0, logger_1.LogInfo)(`Query param: ${id}`);
    // Instancia de controlador
    const controller = new UsersController_1.UsersController();
    // Se crea un objeto con los datos que pasa el usuario
    let user = req.body;
    console.log(user);
    let response = "";
    if (id) {
        (0, logger_1.LogSuccess)(`[/api/users] Actualizando usuario con el ID ${id}`);
        // Obtener la respuesta
        yield controller.updateUser(id, user).then((r) => {
            response = {
                status: 204,
                message: `¡El usuario ${user.name} añadido con éxito a la BD!`,
            };
        });
    }
    else {
        (0, logger_1.LogWarning)(`[/api/users] Tratando de actualizar el usuario sin el ID.`);
        response = {
            status: 400,
            message: "No se puede actualizar el usuario sin el ID. Debes proporcionar uno."
        };
    }
    // Devolver la respuesta al cliente
    return res.status(response.status).send(response);
}));
userRouter.route("/katas")
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    let id = req.query.id;
    let page = ((_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.page) || 1;
    let limit = ((_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.limit) || 10;
    let response = {};
    const controller = new UsersController_1.UsersController();
    if (id) {
        (0, logger_1.LogSuccess)(`[/api/users/katas] Obteniendo los katas del usuario ${id}...`);
        response = yield controller.getKatasByUser(page, limit, id);
    }
    else {
        (0, logger_1.LogWarning)(`[/api/users/katas] Obteniendo katas sin el ID...`);
        response = {
            status: 400,
            message: "Debes proporcionar el ID para obtener los katas de X usuario."
        };
    }
    return res.status(response.status).send(response);
}));
exports.default = userRouter;
