import { Delete, Get, Query, Route, Tags, Post, Put } from "tsoa";
import { IKataController } from "./interfaces";
import { LogSuccess, LogWarning } from "../utils/logger";
import { getAllKatas, getKatasByLevel, getKataById, deleteKataById, createNewKata, updateKataById, getSortByDate, getSortByTries, getSortByValoration } from "../domain/orm/Kata.orm";
import { IKata } from "./interfaces/IKata.interface";

@Route("/api/katas")
@Tags("KataController")
export class KataController implements IKataController {
  /**
   * Endpoint que devuelve un kata a partir del ID.
   */
  @Get("/")
  public async getAllKatas(): Promise<any> {
    let response: any;

    LogSuccess(`[/api/katas] Obteniendo todos los katas de la BD.`);
    response = await getAllKatas();

    return response;
  }

  /**
   * Endpoint que devuelve un kata a partir del ID.
   */
  @Get("/")
  public async getKata(@Query() id: string): Promise<any> {
    let response: any;

    LogSuccess(`[/api/katas] Obteniendo el kata con el ID ${id}...`);
    response = await getKataById(id);

    return response;
  }

  /**
   * Endpoint que devuelve la lista de katas ordenadas por X criterio.
   */
  @Get("/")
  public async getKataSortedBy(@Query() sortedBy: string): Promise<any> {
    let response: any;

    if (sortedBy) {
      switch (sortedBy) {
        case "date":
          LogSuccess(`[/api/katas] Mostrando las 5 katas más recientes.`);
          response = await getSortByDate();
          break;
        case "valoration":
          LogSuccess(`[/api/katas] Mostrando los katas ordenados por valoración de mayor a menor.`);
          response = await getSortByValoration();
          break;
        case "chances":
          LogSuccess(`[/api/katas] Mostrando los katas ordenados por intentos de mayor a menor.`);
          response = await getSortByTries();
          break;
      }

      return response;
    }
  }

  /**
  * Endpoint que devuelve una lista de katas en función de su dificultad.
  */
  @Get("/")
  public async getKatasByLevel(@Query() level: number): Promise<any> {
    LogSuccess(`[/api/katas] Obteniendo la lista de katas de nivel de dificultad ${level}`);

    let response: any = "";

    if (level) {
      response = await getKatasByLevel(level);
      return response;
    }
  }

  /**
  * Endpoint que permite borrar un kata de la BD.
  */
  @Delete("/")
  public async deleteKata(@Query() id: string): Promise<any> {
    let response: any;

    if (id) {
      LogSuccess(`[/api/katas] Borrando el kata con el ID ${id} ...`);
      response = await deleteKataById(id);
    } else {
      LogWarning("[/api/katas] Tratando de borrar el kata sin el ID...");
      response = {
        message: "Introduce una ID válida para borrar el kata de la BD."
      }
    }

    return response;

  }

  /**
  * Endpoint que permite añadir un kata a la BD
  */
  @Post("/")
  public async createKata(@Query() kata: IKata): Promise<any> {
    let response: any = "";
    LogSuccess(`[/api/katas] Añadiendo nuevo kata ...`);
    response = await createNewKata(kata);

    return response;
  }

  /**
  * Endpoint que permite actualizar un kata a la BD
  */
  @Put("/")
  public async updateKata(@Query() id: string, kata: IKata): Promise<any> {
    let response: any = "";

    if (id) {
      LogSuccess(`[/api/katas] Modificando los datos del kata con ID ${id} ...`);
      await updateKataById(id, kata).then((r) => {
        response = {
          message: `¡El kata con ID ${id} se ha actualizado con éxito!`
        }
      });
    } else {
      LogWarning(`[/api/katas] Tratando de actualizar datos sin la ID`);
      response = {
        message: `Debes proporcionar una ID para actualizar los datos.`
      }
    }

    return response;
  }
}
