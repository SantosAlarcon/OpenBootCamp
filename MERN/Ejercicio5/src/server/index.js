"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Variables de entorno
const dotenv_1 = __importDefault(require("dotenv"));
// Seguridad
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// Root router
const routes_1 = __importDefault(require("../routes"));
// Routers
const HelloRouter_1 = __importDefault(require("../routes/HelloRouter"));
const UserRouter_1 = __importDefault(require("../routes/UserRouter"));
const KataRouter_1 = __importDefault(require("../routes/KataRouter"));
// Configuración del archivo .env
dotenv_1.default.config();
// Crear instancia de Express
const server = (0, express_1.default)();
// Definir los endpoints
server.use("/api", routes_1.default);
server.use("/api/hello", HelloRouter_1.default);
server.use("/api/users", UserRouter_1.default);
server.use("/api/katas", KataRouter_1.default);
// Servidor estático
server.use(express_1.default.static("public"));
// Conectar a la BD de MongoDB
mongoose_1.default.connect("mongodb://santos:santos@192.168.43.139:27017/codeverification");
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
