// Entidad de usuario para la conexión a la BD
import mongoose, { Schema, model } from "mongoose";

export const userEntity = () => {
    let userSchema = new Schema({
        name: String,
        email: String,
        age: Number
    })

    return model("users", userSchema);
}
