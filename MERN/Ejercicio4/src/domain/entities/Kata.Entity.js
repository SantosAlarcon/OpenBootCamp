"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kataEntity = void 0;
// Entidad de usuario para la conexión a la BD
const mongoose_1 = require("mongoose");
const kataEntity = () => {
    let kataSchema = new mongoose_1.Schema({
        name: String,
        description: String,
        level: Number,
        user: String,
        date: Date,
        valoracion: Number,
        chances: Number
    });
    return (0, mongoose_1.model)("katas", kataSchema);
};
exports.kataEntity = kataEntity;
