/**
 * Basic JSON response for controllers
 */

export type BasicResponse = {
  message: string
}

/**
 * Error JSON response for controllers
 */
export type ErrorResponse = {
  error: string,
  message: string
}

/**
 * Respuesta de autenticación
 */

export type AuthResponse = {
  message: string,
  token: string
}
