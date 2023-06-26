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
const UserController_1 = require("../controller/UserController");
const logger_1 = require("../utils/logger");
// Routers
let userRouter = express_1.default.Router();
userRouter
    .route("/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Obtiene la id de los parámetros
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    (0, logger_1.LogInfo)(`Query param: ${id}`);
    // Instancia de controlador
    const controller = new UserController_1.UserController();
    // Obtener la respuesta
    const response = yield controller.getUsers(id);
    // Devolver la respuesta al cliente
    return res.send(response);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // Obtiene la id de los parámetros
    let id = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.id;
    (0, logger_1.LogInfo)(`Query param: ${id}`);
    // Instancia de controlador
    const controller = new UserController_1.UserController();
    // Obtener la respuesta
    const response = yield controller.deleteUser(id);
    // Devolver la respuesta al cliente
    return res.send(response);
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    // Instancia de controlador
    const controller = new UserController_1.UserController();
    const name = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.name;
    const email = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.email;
    const age = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.age;
    // Se crea un objeto con los datos que pasa el usuario
    const newUser = { name: name, email: email, age: age };
    let response = "";
    // Obtener la respuesta
    yield controller.createUser(newUser).then((r) => {
        (0, logger_1.LogSuccess)(`[/api/users] Crear usuario: ${newUser}`);
        response = {
            message: `¡El usuario ${newUser.name} añadido con éxito a la BD!`,
        };
    });
    // Devolver la respuesta al cliente
    return res.send(newUser);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    // Obtiene la id de los parámetros
    let id = (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.id;
    (0, logger_1.LogInfo)(`Query param: ${id}`);
    // Instancia de controlador
    const controller = new UserController_1.UserController();
    // Se crea un objeto con los datos que pasa el usuario
    let user = req.body;
    console.log(user);
    let response = "";
    // Obtener la respuesta
    yield controller.createUser(user).then((r) => {
        (0, logger_1.LogSuccess)(`[/api/users] Crear usuario: ${user}`);
        response = {
            message: `¡El usuario ${user.name} añadido con éxito a la BD!`,
        };
    });
    // Devolver la respuesta al cliente
    return res.send(response);
}));
exports.default = userRouter;
