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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKataById = exports.createNewKata = exports.deleteKataById = exports.getSortByTries = exports.getSortByValoration = exports.getSortByDate = exports.getKatasByLevel = exports.getKataById = exports.getAllKatas = void 0;
const logger_1 = require("../../utils/logger");
const Kata_Entity_1 = require("../entities/Kata.Entity");
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
