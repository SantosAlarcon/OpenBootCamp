import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { KataController } from "../controller/KataController";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { LogInfo, LogSuccess } from "../utils/logger";
import * as jwt from "jsonwebtoken";
import { userEntity } from "../domain/entities/User.Entity";

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
        const creadorKata = {...await controller.getKata(id)};

        console.log(creadorKata);

        // Aquí se comprueba si el ID del usuario actual coincide con el del creador
        // del kata a borrar.
        if (idUsuarioActual === creadorKata) {
            // Obtener la respuesta
            response = await controller.deleteKata(id);
            response.status = 202
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

        let token: any = req.headers["x-access-token"];
        let decoded: any = jwt.decode(token);

        // Instancia de controlador y del modelo de usuario
        const controller: KataController = new KataController();
        const userModel = userEntity();

        let response: any = "";

        // Se obtienen los datos del req.body
        const { name, description, level, date, stars, chances, participants } = req.body;

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
                participants: participants
            };

            // Obtener la respuesta
            await controller.createKata(newKata).then((r) => {
                LogSuccess(`[/api/katas] Crear kata: ${newKata.name}`);
                response = {
                    message: `¡El kata ${newKata.name} se ha añadido con éxito a la BD!`,
                };
            });

            // Devolver la respuesta al cliente y le envía el código 201 de recurso
            // creado.
            return res.send(newKata).status(201);

        } else {
            response = {
                message: "Debes introducir los campos obligatorios para poder crear un kata."
            }
        }

        return response;

    })
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        let response: any = "";

        let id: any = req.query.id;

        // Se obtienen los datos del req.body
        const { name, description, level, creator, date, stars, chances, participants } = req.body;

        if (id && name && description && level && creator && date && stars && chances && participants) {
            // Se crea un objeto con los datos que pasa el kata
            const newKata = {
                name: name,
                description: description,
                level: level,
                creator: creator,
                date: date,
                stars: stars,
                chances: chances,
                participants: participants
            };

            // Instancia de controlador
            const controller: KataController = new KataController();

            // Obtener la respuesta
            await controller.updateKata(id, newKata).then((r) => {
                LogSuccess(`[/api/katas] Modificar kata: ${newKata}`);
                response = {
                    message: `¡El kata ${newKata.name} se ha modificado con éxito!`,
                };
            });

        } else {
            response = {
                message: "Debes proporcionar el ID y los nuevos datos que quieres modificar."
            }
        }

        // Devolver la respuesta al cliente
        return res.send(response);
    });

export default kataRouter;
