import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { KataController } from "../controller/KataController";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { LogInfo, LogSuccess } from "../utils/logger";
import * as jwt from "jsonwebtoken";
import { userEntity } from "../domain/entities/User.Entity";
import { kataEntity } from "../domain/entities/Kata.Entity";
import mongoose from "mongoose";
import { kataRatedbyUser } from "../domain/orm/Kata.orm";

const jsonParser = bodyParser.json();

// Routers
const kataRouter = express.Router();

kataRouter
    .route("/")
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtiene la id, nivel, pagina, limite y sortBy de los parámetros
        const id: any = req?.query?.id;
        const level: any = req?.query?.level;
        const sortBy: any = req?.query?.sortBy;
        const page: any = req?.query?.page || 1;
        const limit: any = req?.query?.limit || 10;

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
        const token: any = req.headers["x-access-token"];
        const decoded: any = jwt.decode(token);
        let response: any;

        // Obtiene la id de los parámetros
        const id: any = req?.query?.id;
        LogInfo(`Query param: ${id}`);

        // Instancia de controlador
        const controller: KataController = new KataController();
        const userModel = userEntity();

        // Para obtener los datos del creador hay que consultar la base de datos por
        // el email y guardarlo en un objeto usuario.
        const usuario = { ...(await userModel.find({ email: decoded.email })) }[0];

        // Se guarda el ID del creador/usuario actual en una variable
        const idUsuarioActual = usuario["_id"].toString();

        // Se obtiene el ID del creador del kata
        const creadorKata = await controller.getKata(id);
        const idCreadorKata = creadorKata["creator"].toString();

        // Aquí se comprueba si el ID del usuario actual coincide con el del creador
        // del kata a borrar.
        if (idUsuarioActual === idCreadorKata) {
            // Se intenta borrar el kata
            await controller.deleteKata(id).then(async (exito) => {
                // Si se tiene éxito en el borrado del kata, se borra la ID del kata del array de katas del creador.
                if (exito) {
                    // Se borra del array del creador del kata el ID kata borrado.
                    await userModel.updateOne(
                        { _id: new mongoose.Types.ObjectId(idCreadorKata) },
                        {
                            $pull: {
                                katas: id,
                            },
                        }
                    );

                    LogSuccess(`[/api/katas] Borrar kata: ${id}`);
                    response = {
                        message: `¡El kata con ID ${id} se ha borrado con éxito a la BD!`,
                        status: 202,
                    };
                }
            });
        } else {
            response = {
                message: "Sólo el creador del kata puede borrarlo de la BD.",
                status: 400,
            };
        }

        // Devolver la respuesta al cliente
        return res.send(response).status(response.status);
    })
    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
        // Se obtiene del token la información del usuario actual.
        const token: any = req.headers["x-access-token"];
        const decoded: any = jwt.decode(token);

        // Instancia de controlador y del modelo de usuario
        const controller: KataController = new KataController();
        const userModel = userEntity();
        const kataModel = kataEntity();

        let response: any = "";

        // Se obtienen los datos del req.body
        const {
            name,
            description,
            level,
            date,
            stars,
            chances,
            participants,
            solution,
        } = req.body;

        // Para obtener los datos del creador hay que consultar la base de datos por
        // el email y guardarlo en un objeto usuario.
        const usuario = { ...(await userModel.find({ email: decoded.email })) }[0];

        // Se guarda el ID del creador/usuario actual en una variable
        const creator = usuario["_id"].toString();

        if (
            name &&
            description &&
            level &&
            creator &&
            date &&
            stars &&
            chances &&
            participants
        ) {
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
                solution: solution,
            };

            // Obtener la respuesta
            await controller.createKata(newKata).then(async (exito) => {
                if (exito) {
                    // Ahora se busca el ID del nuevo kata creado
                    const createdKata = await kataModel.find({ name: newKata.name });

                    const idKata = createdKata[0]["_id"].toString();

                    // Se añade al array del creador del kata el ID kata creado.
                    await userModel.updateOne(
                        { _id: new mongoose.Types.ObjectId(creator) },
                        {
                            $push: {
                                katas: idKata,
                            },
                        }
                    );

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
                message:
                    "Debes introducir los campos obligatorios para poder crear un kata.",
            };
        }

        return response;
    })
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        let response: any = "";
        const token: any = req.headers["x-access-token"];
        const decoded: any = jwt.decode(token);

        // Obtiene la id de los parámetros
        const id: any = req?.query?.id;
        LogInfo(`Query param: ${id}`);

        // Se obtienen los datos del req.body
        const {
            name,
            description,
            level,
            date,
            stars,
            chances,
            participants,
            solution,
        } = req.body;

        // Instancia de controlador
        const controller: KataController = new KataController();
        const userModel = userEntity();

        // Para obtener los datos del creador hay que consultar la base de datos por
        // el email y guardarlo en un objeto usuario.
        const usuario = { ...(await userModel.find({ email: decoded.email })) }[0];

        // Se guarda el ID del creador/usuario actual en una variable
        const idUsuarioActual = usuario["_id"].toString();

        // Se obtiene el ID del creador del kata
        const creadorKata = await controller.getKata(id);
        const idCreadorKata = creadorKata["creator"].toString();

        if (
            id &&
            name &&
            description &&
            level &&
            date &&
            stars &&
            chances &&
            participants &&
            solution
        ) {
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
                solution: solution,
            };

            // Aquí se comprueba si el ID del usuario actual coincide con el del creador
            // del kata a borrar.
            if (idUsuarioActual === idCreadorKata) {
                // Obtener la respuesta
                await controller.updateKata(id, newKata).then((r) => {
                    LogSuccess(`[/api/katas] Modificar kata: ${newKata}`);
                    response = {
                        message: `¡El kata ${newKata.name} se ha modificado con éxito!`,
                        status: 204,
                    };
                });
            } else {
                response = {
                    message:
                        "Sólo el creador del kata puede actualizar la información de la BD.",
                    status: 400,
                };
            }
        } else {
            response = {
                message:
                    "Debes proporcionar el ID y los nuevos datos que quieres modificar.",
                status: 400,
            };
        }

        // Devolver la respuesta al cliente
        return res.send(response).status(response.status);
    });

// Ruta para puntuar katas
kataRouter.route("/rate")
    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
        let response: any = "";
        const id: any = req?.query?.id
        const stars: any = req?.body?.stars
 
        const token: any = req.headers["x-access-token"];
        const decoded: any = jwt.decode(token);

        // Se comprueba que el usuario ha introducido la ID de la kata y la
        // valoración es de 1 a 5.
        if (id && (stars > 0 && stars < 6)) {

            // Primero se obtiene el usuario que ha iniciado sesión y luego su ID.
            const userModel = userEntity();
            const kataModel = kataEntity();
            const usuario = { ...(await userModel.find({ email: decoded.email })) }[0];
            const idUsuarioActual = usuario["_id"].toString();
            const newValoration = {
                id: idUsuarioActual,
                stars: stars
            }

            // Primero se comprueba si el usuario ya ha valorado previamente esta kata.
            const alreadyRated = await kataRatedbyUser(id, idUsuarioActual);

            const controller: KataController = new KataController();

            // Se añade la nueva valoración si el usuario no ha valorado previamente la kata.
            if (!alreadyRated) {
                await controller.rateKata(id, newValoration).then((exito: any) => {
                    if (exito) {
                        response = {
                            message: `${usuario.name} ha puntuado la kata con ID ${id} con ${stars} estrellas.`,
                            status: 201
                        }
                    }
                })
                
                /*await kataModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, {
                    $push: {
                        stars: newValoration
                    }
                }).then((exito) => {

                    if (exito) {
                        response = {
                            message: `${usuario.name} ha puntuado la kata con ID ${id} con ${stars} estrellas.`,
                            status: 201
                        }
                    }

                })*/
            } else {
                response = {
                    message: "Ya has votado a esta kata. Puntúa otra kata diferente.",
                    status: 400
                }
            }
        } else {
            response = {
                message: "Debes introducir un valor entre 1 a 5 estrellas para puntuar la Kata",
                status: 400
            }
        }

        // Devuelve la respuesta del servidor y el código de estado.
        return res.send(response).status(response.status)
    })

export default kataRouter;
