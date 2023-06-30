"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("../routes"));
const routes_2 = require("../routes");
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Variables de entorno
require("dotenv/config");
// Seguridad
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// Crear instancia de Express
//const server: Express = express();
// Carga la ruta raíz que permite cargar el resto.
routes_1.default.use("/api", routes_2.rootRouter);
// Servidor estático
routes_1.default.use(express_1.default.static("public"));
console.log(`MONGO URI: ${process.env.MONGO_URI}`);
// Conectar a la BD de MongoDB
mongoose_1.default.connect(process.env.MONGO_URI);
// Configuración de seguridad
routes_1.default.use((0, helmet_1.default)());
routes_1.default.use((0, cors_1.default)());
// Config tipo contenido | Límite de subida a 50 MB
routes_1.default.use(express_1.default.json({ limit: '50mb' }));
routes_1.default.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
// Configuración y ruta de Swagger
routes_1.default.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
        explorer: true
    }
}));
// Redirigir el endpoint principal a /api
routes_1.default.get("/", (req, res) => {
    res.redirect("/api");
});
exports.default = routes_1.default;
