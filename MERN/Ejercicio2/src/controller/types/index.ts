/**
 * Basic JSON response for controllers
 */

export type BasicResponse = {
    message: string
}

export type GoodbyeResponse = {
    message: string,
    date: Date
}

/**
 * Error JSON response for controllers
 */ 
export type ErrorResponse = {
    error: string,
    message: string
}
