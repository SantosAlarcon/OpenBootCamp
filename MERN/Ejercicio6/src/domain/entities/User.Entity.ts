// Entidad de usuario para la conexión a la BD
import mongoose from "mongoose";
import { IUser } from "../../controller/interfaces/IUser.interface";

export const userEntity = () => {
  /*let userschema = new mongoose.schema({
    name: string,
    email: string,
    age: number,
  });*/

  let userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
  })

  return mongoose.models.users || mongoose.model<IUser>("users", userSchema);
};
