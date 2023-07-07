import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { KataController } from "../controller/KataController";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { LogInfo, LogSuccess } from "../utils/logger";

let jsonParser = bodyParser.json();

// Routers
let kataRouter = express.Router();

kataRouter
  .route("/")
  .get(verifyToken, async (req: Request, res: Response) => {

    // Obtiene la id de los parámetros
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
    // Obtiene la id de los parámetros
    let id: any = req?.query?.id;
    LogInfo(`Query param: ${id}`);

    // Instancia de controlador
    const controller: KataController = new KataController();

    // Obtener la respuesta
    const response: any = await controller.deleteKata(id);

    // Devolver la respuesta al cliente
    return res.send(response);
  })
  .post(verifyToken, jsonParser, async (req: Request, res: Response) => {
    // Instancia de controlador
    const controller: KataController = new KataController();

    let response: any = "";

    // Se obtienen los datos del req.body
    const { name, description, level, creator, date, stars, chances } = req.body;

    if (name && description && level && creator && date && stars && chances) {
      // Se crea un objeto con los datos que pasa el kata
      const newKata = {
        name: name,
        description: description,
        level: level,
        creator: creator,
        date: date,
        stars: stars,
        chances: chances,
      };

      LogInfo(`{newKata}`);


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
  .put(verifyToken, jsonParser, async (req: Request, res: Response) => {
    let response: any = "";

    let id: any = req.query.id;

    // Se obtienen los datos del req.body
    const { name, description, level, creator, date, stars, chances } = req.body;

    if (id && name && description && level && creator && date && stars && chances) {
      // Se crea un objeto con los datos que pasa el kata
      const newKata = {
        name: name,
        description: description,
        level: level,
        creator: creator,
        date: date,
        stars: stars,
        chances: chances,
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
