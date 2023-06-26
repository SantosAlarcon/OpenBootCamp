import {Get, Query, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IHelloController } from "./interfaces";
import { LogSuccess } from "../utils/logger"

@Route("/api/hello")
@Tags("HelloController")
export class HelloController implements IHelloController {
    /**
    * Endpoint que devuelve un mensaje con un nombre.
    * @param {string | undefined} name usuario al que le va a saludar.
    * @returns {BasicResponse} Promesa tipo "BasicResponse"
    */
    @Get("/")
    public async getMessage(
        @Query() name?: string
    ): Promise<BasicResponse> {
       LogSuccess("[/api/hello] Get Request");

        return {
            message: `Hello, ${name || "world"}`
        }
    }
}
