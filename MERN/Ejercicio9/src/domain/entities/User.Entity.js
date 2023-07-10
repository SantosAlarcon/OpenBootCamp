"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = void 0;
// Entidad de usuario para la conexión a la BD
const mongoose_1 = __importDefault(require("mongoose"));
const userEntity = () => {
    let userSchema = new mongoose_1.default.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        age: { type: Number, required: true },
        password: { type: String, required: true },
        katas: { type: [], required: true }
    });
    return mongoose_1.default.models.users || mongoose_1.default.model("users", userSchema);
};
exports.userEntity = userEntity;
