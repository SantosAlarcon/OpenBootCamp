import { Delete, Get, Query, Route, Tags, Post, Put, Body } from "tsoa";
import { IKataController } from "./interfaces";
import { LogError, LogSuccess, LogWarning } from "../utils/logger";
import { getAllKatas, getKatasByLevel, getKataById, deleteKataById, createNewKata, updateKataById, getSortByDate, getSortByTries, getSortByValoration, getSortByLevel, rateKataById } from "../domain/orm/Kata.orm";
import { IKata, IKataValoration } from "./interfaces/IKata.interface";

@Route("/api/katas")
@Tags("KataController")
export class KataController implements IKataController {
  /**
   * Endpoint que devuelve un kata a partir del ID.
   */
  @Get("/")
  public async getAllKatas(@Query() page: number, @Query() limit: number): Promise<any> {
    let response: any;

    LogSuccess(`[/api/katas] Obteniendo todos los katas de la BD.`);
    response = await getAllKatas(page, limit);

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
        case "level":
          LogSuccess(`[/api/katas] Mostrando los katas ordenados por nivel.`);
          response = await getSortByLevel();
          break;
        case "date":
          LogSuccess(`[/api/katas] Mostrando las 5 katas más recientes.`);
          response = await getSortByDate();
          break;
        case "stars":
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
  public async createKata(@Body() kata: IKata): Promise<any> {

    let response: any = "";

    if (kata) {
      LogSuccess(`[/api/katas] Añadiendo nuevo kata ...`);
      await createNewKata(kata).then((r) => {
        LogSuccess(`[/api/katas]: Kata creado`);
        response = {
          message: `El kata ${kata.name} se ha creado con éxito.`
        }
      });

    } else {
      LogWarning("[/api/katas] El Kata necesita los datos del kata");
      response = {
        message: "Debes proporcionar los datos del kata para poder crearlo."
      }
    }


    return response;
  }

  /**
   * Endpoint que permite puntuar una kata del 1 al 5, y se guarda la valoración del
   * usuario.
   */
  @Post("/rate")
  public async rateKata(@Query("id") id: string, @Body() stars: number): Promise<any> {
    let response: any = "";

    if (id) {
      if (stars > 5 || stars < 1) {
        LogWarning(`[api/katas/rate] Valorando un kata con un valor fuera de rango.`)
        response = {
          message: "Debes introducir un valor entre 1 y 5 estrellas."
        }
      } else {
        LogSuccess(`[api/katas/rate] Añadiendo nueva puntuación al kata...`);
        await rateKataById(id, stars).then((exito) => {
          if (exito) {
            LogSuccess(`[api/katas/rate] El kata con ID ${id} ha recibido nueva puntuación.`);
            response = {
              message: `El kata con ID ${id} ha recibido una nueva valoración de ${stars} estrellas.`
            }
          }
        })
      }

    } else {
      LogWarning(`[api/katas/rate] Valorando nuevo kata sin la ID y la valoración`);
      response = {
        message: "Debes introducir la ID del kata y la puntuación de la misma."
      }
    }

    return response;
  }

  /**
  * Endpoint que permite actualizar un kata a la BD
  */
  @Put("/")
  public async updateKata(@Query("id") id: string, @Body() kata: IKata): Promise<any> {
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
