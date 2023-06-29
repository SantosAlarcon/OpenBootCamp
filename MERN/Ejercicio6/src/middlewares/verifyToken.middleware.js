"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Función que verifa el token de autenticación
 * @param req Petición original del middlware de JWT
 * @param res Respuesta a la verificación del JWT
 * @param next Siguiente función a ejecutar
 * @returns Error de la verificación de la ejecución siguiente
 */
const verifyToken = (req, res, next) => {
    // Comprobar la cabecera de la petición del cliente
    let jwtToken = req.headers.get("x-access-token");
    if (!jwtToken) {
        return res.status(403).send({
            authenticationError: "JWT no encontrado en la petición",
            message: "No estás autorizado para usar este endpoint",
        });
    }
    jsonwebtoken_1.default.verify(jwtToken, "", (error, decoded) => {
        if (error) {
            return res.status(500).send({
                authenticationError: "Error de verificación de JWT",
                message: "Fallo al verificar el JWT en la petición",
            });
        }
        //req.userId = decoded.id
        // Ejecutar la siguiente función
        next();
    });
};
exports.verifyToken = verifyToken;
