import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({"data": {"message": "Goodbye, world"}});
})

app.get("/hello", (req: Request, res: Response) => {
    let nombre = req.query.name;
    if (!nombre) nombre = "anónimo";
    res.status(200).send({"data": {"message": `Hola, ${nombre}.`}})
})

app.listen(port, () => {
    console.log(`Escuchando por el puerto ${port}...`)
})
