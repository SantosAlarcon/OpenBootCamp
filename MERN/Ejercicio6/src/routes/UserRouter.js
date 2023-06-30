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
const UsersController_1 = require("../controller/UsersController");
const logger_1 = require("../utils/logger");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    const controller = new UsersController_1.UsersController();
    // Obtener la respuesta
    const response = yield controller.getUsers(id);
    // Devolver la respuesta al cliente y el código de estado.
    return res.send(response).status(200);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // Obtiene la id de los parámetros
    let id = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.id;
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
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    // Instancia de controlador
    const controller = new UsersController_1.UsersController();
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
    // Devolver la respuesta al cliente y el código de estado 201.
    return res.send(newUser).status(201);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    // Obtiene la id de los parámetros
    let id = (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.id;
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
userRouter.route("/auth/register")
    .post((req, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, age, password } = req.body;
    let hashedPassword = "";
    if (password && name && email && age) {
        hashedPassword = bcrypt_1.default.hashSync(req.body.password, 8);
    }
    let newUser = {
        name,
        email,
        age,
        password: hashedPassword
    };
    const controller = new UserController_1.UserController();
    const response = yield controller.register(newUser);
}));
exports.default = userRouter;
