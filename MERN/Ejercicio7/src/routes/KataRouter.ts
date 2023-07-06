import express, { Request, Response } from "express";
import { KataController } from "../controller/KataController";
import { LogInfo, LogSuccess } from "../utils/logger";

// Routers
let kataRouter = express.Router();

kataRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    // Obtiene la id de los parámetros
    let id: any = req?.query?.id;
    let level: any = req?.query?.level;
    let sortBy: any = req?.query?.sortBy;

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
      response = await controller.getAllKatas();
    }

    // Devolver la respuesta al cliente
    return res.send(response);
  })
  .delete(async (req: Request, res: Response) => {
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
  .post(async (req: Request, res: Response) => {
    // Instancia de controlador
    const controller: KataController = new KataController();

    const name = req?.query?.name;
    const description = req?.query?.desc;
    const level = req?.query?.level;
    const creator = req?.query?.creator;
    const date = req?.query?.date;
    const stars = req?.query?.stars;
    const chances = req?.query?.chances;

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

    let response: any = "";

    // Obtener la respuesta
    await controller.createKata(newKata).then((r) => {
      LogSuccess(`[/api/katas] Crear kata: ${newKata.name}`);
      response = {
        message: `¡El kata ${newKata.name} se ha añadido con éxito a la BD!`,
      };
    });

    // Devolver la respuesta al cliente
    return res.send(newKata);
  })
  .put(async (req: Request, res: Response) => {
    // Obtiene la id de los parámetros
    let id: any = req?.query?.id;
    LogInfo(`Query param: ${id}`);

    // Instancia de controlador
    const controller: KataController = new KataController();

    // Se crea un objeto con los datos que pasa el kata
    let kata = req.body;

    console.log(kata);

    let response: any = "";

    // Obtener la respuesta
    await controller.createKata(kata).then((r) => {
      LogSuccess(`[/api/katas] Crear kata: ${kata}`);
      response = {
        message: `¡El kata ${kata.name} añadido con éxito a la BD!`,
      };
    });

    // Devolver la respuesta al cliente
    return res.send(response);
  });

export default kataRouter;
