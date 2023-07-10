// Entidad de usuario para la conexión a la BD
import mongoose from "mongoose";
import { IUser } from "../../controller/interfaces/IUser.interface";

export const userEntity = () => {

  let userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    katas: { type: [], required: true }
  })

  return mongoose.models.users || mongoose.model<IUser>("users", userSchema);
};
