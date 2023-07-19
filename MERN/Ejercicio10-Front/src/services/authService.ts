import axiosConfig from "../utils/config/axios.config";

/**
 * Método para hacer login / iniciar sesión
 *
 * @param (string) email Correo electrónico del usuario
 * @param (string) password Contraseña del usuario
 * @returns (string) Promesa
 */
export const login = (email: string, password: string) => {

  // Cuerpo de la petición
  const body = {
    email: email,
    password: password
  }

  // Enviar una petición POST al endpoint del login
  return axiosConfig.post("/auth/login", body)
}

/**
 * Método para registar un nuevo usuario
 *
 * @param (string) name Nombre del usuario
 * @param (string) email Correo electrónico del usuario
 * @param (string) password Contraseña del usuario
 * @param (string) age Edad del usuario
 * @returns (string) Promesa
 */
export const register = (name: string, email: string, password: string, age: number) => {

  // Cuerpo de la petición
  const body = {
    name: name,
    email: email,
    password: password,
    age: age
  }

  // Enviar una petición POST al endpoint del register
  return axiosConfig.post("/auth/register", body);
}
