import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { KataController } from "../controller/KataController";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { LogInfo, LogSuccess } from "../utils/logger";
import * as jwt from "jsonwebtoken";
import { userEntity } from "../domain/entities/User.Entity";
import { kataEntity } from "../domain/entities/Kata.Entity";
import mongoose from "mongoose";

let jsonParser = bodyParser.json();

// Routers
let kataRouter = express.Router();

kataRouter
    .route("/")
    .get(verifyToken, async (req: Request, res: Response) => {

        // Obtiene la id, nivel, pagina, limite y sortBy de los parámetros
        let id: any = req?.query?.id;
        let level: any = req?.query?.level;
        let sortBy: any = req?.query?.sortBy;
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;

        // Instancia de controlador
        const controller: KataController = new KataController();

        let response: any = "";

        if (id) {
            LogInfo(`Query param: ${id}`);
            response = await controller.getKata(id);
        } else if (level) {
            LogInfo(`Query param: ${level}`);
            response = await controller.getKatasByLevel(level);
        } else if (sortBy) {
            LogInfo(`Query param: ${sortBy}`);
            response = await controller.getKataSortedBy(sortBy);
        } else {
            response = await controller.getAllKatas(page, limit);
        }

        // Devolver la respuesta al cliente
        return res.send(response);
    })
    .delete(verifyToken, async (req: Request, res: Response) => {

        let token: any = req.headers["x-access-token"];
        let decoded: any = jwt.decode(token);
        let response: any;

        // Obtiene la id de los parámetros
        let id: any = req?.query?.id;
        LogInfo(`Query param: ${id}`);

        // Instancia de controlador
        const controller: KataController = new KataController();
        const userModel = userEntity();

        // Para obtener los datos del creador hay que consultar la base de datos por
        // el email y guardarlo en un objeto usuario.
        const usuario = { ...await userModel.find({ email: decoded.email }) }[0];

        // Se guarda el ID del creador/usuario actual en una variable
        const idUsuarioActual = usuario["_id"].toString();

        // Se obtiene el ID del creador del kata
        const creadorKata = await controller.getKata(id);
        const idCreadorKata = creadorKata["creator"].toString();

        // Aquí se comprueba si el ID del usuario actual coincide con el del creador
        // del kata a borrar.
        if (idUsuarioActual === idCreadorKata) {

            // Se intenta borrar el kata
            await controller.deleteKata(id).then(async (exito, error) => {

                // Si se tiene éxito en el borrado del kata, se borra la ID del kata del array de katas del creador.
                if (exito) {

                    // Se borra del array del creador del kata el ID kata borrado.
                    await userModel.updateOne({ _id: new mongoose.Types.ObjectId(idCreadorKata) }, {
                        $pull: {
                            katas: id
                        }
                    })

                    LogSuccess(`[/api/katas] Borrar kata: ${id}`);
                    response = {
                        message: `¡El kata con ID ${id} se ha borrado con éxito a la BD!`,
                        status: 202
                    };
                }
            })
        } else {
            response = {
                message: "Sólo el creador del kata puede borrarlo de la BD.",
                status: 400
            }
        }

        // Devolver la respuesta al cliente
        return res.send(response).status(response.status);
    })
    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {

        // Se obtiene del token la información del usuario actual.
        let token: any = req.headers["x-access-token"];
        let decoded: any = jwt.decode(token);

        // Instancia de controlador y del modelo de usuario
        const controller: KataController = new KataController();
        const userModel = userEntity();
        const kataModel = kataEntity();

        let response: any = "";

        // Se obtienen los datos del req.body
        const { name, description, level, date, stars, chances, participants, solution } = req.body;

        // Para obtener los datos del creador hay que consultar la base de datos por
        // el email y guardarlo en un objeto usuario.
        const usuario = { ...await userModel.find({ email: decoded.email }) }[0];

        // Se guarda el ID del creador/usuario actual en una variable
        const creator = usuario["_id"].toString();

        if (name && description && level && creator && date && stars && chances && participants) {
            // Se crea un objeto con los datos que pasa el kata
            const newKata = {
                name: name,
                description: description,
                level: level,
                creator: creator,
                date: date,
                stars: stars,
                chances: chances,
                participants: participants,
                solution: solution
            };

            // Obtener la respuesta
            await controller.createKata(newKata).then(async (exito, error) => {

                if (exito) {

                    // Ahora se busca el ID del nuevo kata creado
                    const createdKata = await kataModel.find({ name: newKata.name });

                    const idKata = createdKata[0]["_id"].toString();

                    // Se añade al array del creador del kata el ID kata creado.
                    await userModel.updateOne({ _id: new mongoose.Types.ObjectId(creator) }, {
                        $push: {
                            katas: idKata
                        }
                    })

                    LogSuccess(`[/api/katas] Crear kata: ${newKata.name}`);
                    response = {
                        message: `¡El kata <<${newKata.name}>> se ha añadido con éxito a la BD!`,
                    };
                }
            });

            // Devolver la respuesta al cliente y le envía el código 201 de recurso
            // creado.
            return res.send(response).status(201);

        } else {
            response = {
                message: "Debes introducir los campos obligatorios para poder crear un kata."
            }
        }

        return response;

    })
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        let response: any = "";
        let token: any = req.headers["x-access-token"];
        let decoded: any = jwt.decode(token);

        // Obtiene la id de los parámetros
        let id: any = req?.query?.id;
        LogInfo(`Query param: ${id}`);

        // Se obtienen los datos del req.body
        const { name, description, level, date, stars, chances, participants, solution } = req.body;

        // Instancia de controlador
        const controller: KataController = new KataController();
        const userModel = userEntity();

        // Para obtener los datos del creador hay que consultar la base de datos por
        // el email y guardarlo en un objeto usuario.
        const usuario = { ...await userModel.find({ email: decoded.email }) }[0];

        // Se guarda el ID del creador/usuario actual en una variable
        const idUsuarioActual = usuario["_id"].toString();

        // Se obtiene el ID del creador del kata
        const creadorKata = await controller.getKata(id);
        const idCreadorKata = creadorKata["creator"].toString();

        if (id && name && description && level && date && stars && chances && participants && solution) {
            // Se crea un objeto con los datos que pasa el kata
            const newKata = {
                name: name,
                description: description,
                level: level,
                creator: idUsuarioActual,
                date: date,
                stars: stars,
                chances: chances,
                participants: participants,
                solution: solution
            };

            // Aquí se comprueba si el ID del usuario actual coincide con el del creador
            // del kata a borrar.
            if (idUsuarioActual === idCreadorKata) {

                // Obtener la respuesta
                await controller.updateKata(id, newKata).then((r) => {
                    LogSuccess(`[/api/katas] Modificar kata: ${newKata}`);
                    response = {
                        message: `¡El kata ${newKata.name} se ha modificado con éxito!`,
                        status: 204
                    };
                });
            } else {
                response = {
                    message: "Sólo el creador del kata puede actualizar la información de la BD.",
                    status: 400
                }
            }
        } else {
            response = {
                message: "Debes proporcionar el ID y los nuevos datos que quieres modificar.",
                status: 400
            }
        }

        // Devolver la respuesta al cliente
        return res.send(response).status(response.status);
    });

export default kataRouter;
