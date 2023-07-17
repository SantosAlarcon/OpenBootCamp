// Entidad de usuario para la conexión a la BD
import mongoose, { Schema, model } from "mongoose";
import { IKata } from "../../controller/interfaces/IKata.interface";

export const kataEntity = () => {
  let kataSchema = new Schema<IKata>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    creator: { type: String, required: true },
    date: { type: Date, required: true },
    stars: { type: [], required: true },
    chances: { type: Number, required: true },
    participants: { type: [], required: true },
    solution: { type: String, required: true }
  });

  return mongoose.models.katas || model<IKata>("katas", kataSchema);
};
