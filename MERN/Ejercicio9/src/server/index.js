"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("../routes");
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Variables de entorno
require("dotenv/config");
// Seguridad
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const HelloRouter_1 = __importDefault(require("../routes/HelloRouter"));
// Crear instancia de Express
const server = (0, express_1.default)();
// Carga la ruta raíz que permite cargar el resto.
const UserRouter_1 = __importDefault(require("../routes/UserRouter"));
const KataRouter_1 = __importDefault(require("../routes/KataRouter"));
const AuthRouter_1 = __importDefault(require("../routes/AuthRouter"));
server.use("/api", routes_1.rootRouter);
server.use("/api/hello", HelloRouter_1.default);
server.use("/api/users", UserRouter_1.default);
server.use("/api/katas", KataRouter_1.default);
server.use("/api/auth", AuthRouter_1.default);
// Servidor estático
server.use(express_1.default.static("public"));
console.log(`MONGO URI: ${process.env.MONGO_URI}`);
// Conectar a la BD de MongoDB
mongoose_1.default.connect(`${process.env.MONGO_URI}`);
// Configuración de seguridad
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)());
// Config tipo contenido | Límite de subida a 50 MB
server.use(express_1.default.json({ limit: '50mb' }));
server.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
// Configuración y ruta de Swagger
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
        explorer: true
    }
}));
// Redirigir el endpoint principal a /api
server.get("/", (req, res) => {
    res.redirect("/api");
});
exports.default = server;
