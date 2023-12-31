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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const dotenv_1 = require("dotenv");
const jwt = __importStar(require("jsonwebtoken"));
(0, dotenv_1.configDotenv)();
const palabraSecreta = process.env.SECRETO || "MISECRETO";
/**
 * Función que verifa el token de autenticación
 * @param req Petición original del middlware de JWT
 * @param res Respuesta a la verificación del JWT
 * @param next Siguiente función a ejecutar
 * @returns Error de la verificación de la ejecución siguiente
 */
const verifyToken = (req, res, next) => {
    // Comprobar la cabecera de la petición del cliente
    let jwtToken = req.headers["x-access-token"];
    if (!jwtToken) {
        return res.status(403).send({
            authenticationError: "JWT no encontrado en la petición",
            message: "No estás autorizado para usar este endpoint",
        });
    }
    jwt.verify(jwtToken, palabraSecreta, (error, decoded) => {
        if (error) {
            return res.status(500).send({
                authenticationError: "Error de verificación de JWT",
                message: "Fallo al verificar el JWT en la petición",
            });
        }
        // Ejecutar la siguiente función
        next();
    });
};
exports.verifyToken = verifyToken;
