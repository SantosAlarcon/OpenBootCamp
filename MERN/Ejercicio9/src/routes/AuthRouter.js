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
const bcrypt = __importStar(require("bcrypt"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
let jsonParser = body_parser_1.default.json();
let authRouter = express_1.default.Router();
authRouter.route("/register")
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Se extraen los campos importantes del req.body
    let { name, email, age, password } = req === null || req === void 0 ? void 0 : req.body;
    let hashedPassword = "";
    // Si están todos los campos, se procede a generar una contraseña cifrada con 8 pases.
    if (password && name && email && age) {
        hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let newUser = {
            name,
            email,
            age,
            password: hashedPassword,
            katas: []
        };
        const controller = new AuthController_1.AuthController();
        const response = yield controller.registerUser(newUser);
        return res.send(response).status(200);
    }
    else {
        return res.status(400).send({
            message: "Debes proporcionar todos los campos: name, password, age e email."
        });
    }
}));
authRouter.route("/login")
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req === null || req === void 0 ? void 0 : req.body;
    console.log(req.body);
    if (password && email) {
        const controller = new AuthController_1.AuthController();
        let auth = {
            email: email,
            password: password
        };
        const response = yield controller.loginUser(auth);
        // Envía la respuesta al cliente con el token AWT
        return res.send(response).status(200);
    }
    else {
        return res.status(400).send({
            message: "Debes introducir email y contraseña"
        });
    }
}));
// Ruta protegida por el middleware JWT
authRouter.route("/me")
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Se obtiene el ID del usuario
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    if (id) {
        // Se crea una instancia del AuthController
        const controller = new AuthController_1.AuthController();
        // Se obtiene la respuesta del controlador
        let response = yield controller.userData(id);
        // En caso de que la verificación sea válida se envía la respuesta con el código 200.
        return res.status(200).send(response);
    }
    else {
        return res.status(401).send({
            message: `No estás autorizado para utilizar esta ruta.`
        });
    }
}));
exports.default = authRouter;
