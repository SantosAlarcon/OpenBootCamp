// Entidad de usuario para la conexión a la BD
import mongoose, { Schema, model } from "mongoose";

export const kataEntity = () => {
  let kataSchema = new Schema({
    name: String,
    description: String,
    level: Number,
    creator: String,
    date: Date,
    stars: Number,
    chances: Number
  })

  return mongoose.models.katas || model("katas", kataSchema);
}
