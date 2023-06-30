"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
/**
 * Root Router
 * Redirecciones a routers
 */
const express_1 = __importDefault(require("express"));
const logger_1 = require("../utils/logger");
let server = (0, express_1.default)();
// Instancia del router
exports.rootRouter = express_1.default.Router();
// Endpoint GET
exports.rootRouter.get("/", (req, res) => {
    (0, logger_1.LogInfo)('GET: http://localhost:8000/api/');
    res.send("Bienvenido a mi API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose");
});
exports.default = server;
