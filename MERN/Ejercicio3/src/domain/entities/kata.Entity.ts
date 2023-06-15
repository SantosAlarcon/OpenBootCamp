// Entidad de usuario para la conexión a la BD
import mongoose, { Schema, model } from "mongoose";

export const kataEntity = () => {
    let kataSchema = new Schema({
        name: String,
        description: String,
        level: Number,
        user: String,
        date: Date,
        valoracion: Number,
        chances: Number
    })

    return model("katas", kataSchema);
}
