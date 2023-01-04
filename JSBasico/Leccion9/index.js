const winston = require('winston');

const loggers = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
    ],
});


console.error("Este es un mensaje de error. >:(");

try {
    loggers.error("Este es un mensaje de error");
} catch (error) {
    console.log("Fallo al escribir el archivo.");
    console.log(error);
}