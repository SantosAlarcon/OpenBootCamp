// Entidad de usuario para la conexión a la BD
import mongoose from "mongoose";

export const userEntity = () => {
	let userSchema = new mongoose.Schema({
		name: String,
		email: String,
		age: Number,
	});

	return mongoose.models.users || mongoose.model("users", userSchema);
};
