"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Root Router
 * Redirecciones a routers
 */
const express_1 = __importDefault(require("express"));
const logger_1 = require("../utils/logger");
const HelloRouter_1 = __importDefault(require("./HelloRouter"));
const UserRouter_1 = __importDefault(require("./UserRouter"));
// Instancia del servidor
let server = (0, express_1.default)();
// Instancia del router
let rootRouter = express_1.default.Router();
// Endpoint GET
rootRouter.get("/", (req, res) => {
    (0, logger_1.LogInfo)('GET: http://localhost:3000/api/');
    res.send("Bienvenido a mi API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose");
});
// Redirecciones a routers
server.use("/", rootRouter);
server.use("/hello", HelloRouter_1.default);
server.use("/users", UserRouter_1.default);
exports.default = rootRouter;
