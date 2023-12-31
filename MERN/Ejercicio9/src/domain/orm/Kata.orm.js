"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alreadyParticipated = exports.solveKata = exports.kataRatedbyUser = exports.rateKataById = exports.updateKataById = exports.createNewKata = exports.deleteKataById = exports.getSortByTries = exports.getSortByValoration = exports.getSortByDate = exports.getSortByLevel = exports.getKatasByLevel = exports.getKataById = exports.getAllKatas = void 0;
const logger_1 = require("../../utils/logger");
const Kata_Entity_1 = require("../entities/Kata.Entity");
const mongoose_1 = __importDefault(require("mongoose"));
// CRUD de katas
/**
 * Método para obtener todos los katas de la colección "katas" de la BD de MongoDB.
 */
const getAllKatas = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        let response = {};
        // Se buscan todos los katas usando el límite.
        yield kataModel
            .find({})
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((katas) => {
            response.katas = katas;
        });
        // Se hace un recuento de la cantidad de documentos que hay en la colección de katas.
        yield kataModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`Error ORM a la hora de obtener los katas. ${error}`);
    }
});
exports.getAllKatas = getAllKatas;
/**
 * Método para obtener la información de un sólo kata.
 */
const getKataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.findById(id);
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de obtener el kata. ${error}`);
    }
});
exports.getKataById = getKataById;
/**
 * Método para obtener la información de un sólo kata.
 */
const getKatasByLevel = (level) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.find({ level: level });
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de obtener el kata. ${error}`);
    }
});
exports.getKatasByLevel = getKatasByLevel;
/**
 * Método para obtener los katas ordenados por nivel
 */
const getSortByLevel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.find({}).sort({ "level": -1 });
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de extraer la lista de katas ordenados por nivel. ${error}`);
    }
});
exports.getSortByLevel = getSortByLevel;
/**
 * Método para obtener los 5 katas más recientes de mayor a menor.
 */
const getSortByDate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.find({}).sort({ "date": -1 }).limit(5);
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de extraer la lista de katas recientes. ${error}`);
    }
});
exports.getSortByDate = getSortByDate;
/**
 * Método para obtener los katas más valorados de mayor a menor.
 */
const getSortByValoration = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.find({}).sort({ "stars": -1 });
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de extraer la lista de katas más valorados. ${error}`);
    }
});
exports.getSortByValoration = getSortByValoration;
/**
 * Método para obtener los katas con más intentos de mayor a menor.
 */
const getSortByTries = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.find({}).sort({ "chances": -1 });
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de extraer la lista de katas más valorados. ${error}`);
    }
});
exports.getSortByTries = getSortByTries;
/**
 * Método para borrar un kata de la BD
 */
const deleteKataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de borrar el kata. ${error}`);
    }
});
exports.deleteKataById = deleteKataById;
/**
 * Método para crear un nuevo kata
 */
const createNewKata = (kata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.create(kata)
            .then((r) => console.log("Kata creado con éxito"))
            .catch((error) => console.error(error));
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de crear el kata. ${error}`);
    }
});
exports.createNewKata = createNewKata;
/**
 * Método para actualizar los datos de un kata a partir de la ID
 */
const updateKataById = (id, kata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.findByIdAndUpdate(id, kata);
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de actualizar el kata. ${error}`);
    }
});
exports.updateKataById = updateKataById;
/**
 * Método para valorar una kata pasando una ID, en el que se
 * guarda la ID del usuario que la puntua y la valoración.
 */
const rateKataById = (id, valoration) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, {
            $push: {
                stars: valoration
            }
        });
    }
    catch (error) {
        (0, logger_1.LogError)(`Error a la hora de valorar la kata.`);
    }
});
exports.rateKataById = rateKataById;
/**
 * Método que devuelve si un usuario ya ha puntuado una kata.
 */
const kataRatedbyUser = (kataID, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.findById(kataID)
            .where("stars")
            .elemMatch({ "id": userId });
    }
    catch (error) {
        (0, logger_1.LogError)(`[Error ORM]: No se pudo encontrar el usuario dentro de las valoraciones.`);
    }
});
exports.kataRatedbyUser = kataRatedbyUser;
/**
 * Método que permite resolver una kata
 */
const solveKata = (kataID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(kataID) }, {
            $push: {
                participants: userID
            }
        });
    }
    catch (error) {
        (0, logger_1.LogError)(`[Error ORM]: No se pudo guardar la solución de la kata en la BD`);
    }
});
exports.solveKata = solveKata;
/**
 * Método que comprueba si el usuario ya ha participado en la kata.
 */
const alreadyParticipated = (kataID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let kataModel = (0, Kata_Entity_1.kataEntity)();
        return yield kataModel.findById(kataID)
            .where("participants")
            .elemMatch({ userID });
    }
    catch (error) {
        (0, logger_1.LogError)(`[Error ORM]: No se puede obtener los datos de participación`);
    }
});
exports.alreadyParticipated = alreadyParticipated;
