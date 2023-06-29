import { NextFunction } from "express";
import Jwt from "jsonwebtoken";

/**
 * Función que verifa el token de autenticación
* @param req Petición original del middlware de JWT
 * @param res Respuesta a la verificación del JWT
 * @param next Siguiente función a ejecutar
 * @returns Error de la verificación de la ejecución siguiente
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Comprobar la cabecera de la petición del cliente
  let jwtToken: any = req.headers['x-access-token'];

  if (!jwtToken) {
    return res.status(403).send({
      authenticationError: 'JWT no encontrado en la petición',
      message: "No estás autorizado para usar este endpoint"
    })
  }

  Jwt.verify(jwtToken, "", (error: any, decoded: any) => {
    if (error) {
      return res.status(500).send({
        authenticationError: "Error de verificación de JWT",
        message: "Fallo al verificar el JWT en la petición"
      })
    }

    //req.userId = decoded.id

    // Ejecutar la siguiente función
    next();
  })
}
