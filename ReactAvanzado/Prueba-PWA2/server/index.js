import express from "express";
import cors from "cors";
import webpush from 'web-push'

// Middlewares
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas
app.get('/', async(req, res) => {
    res.sendStatus(200).json();
    /* const payload = JSON.stringify({title: "Servidor cargado", message: "El servidor ha cargado correctamente."});
    try {
        await webpush.sendNotification(pushSubscription, payload);
    } catch (e) {
        console.log(e);
    } */
})

// Ruta de suscripción
app.post('/subscription', async(req, res) => {
    console.log(req)
    res.sendStatus(200).json();
})

// Arranca el servidor en el puerto 8000
app.listen(8000, () => console.log("Servidor funcionando"));

export const vapidKeys = {
    publicKey: "BCzTdA2PYgPzsN3CFsT93KWZX9m5wL8VNgzlxUqy4faz0OVSIhvW-x_1e0wZq4OwDW2kOEKWV3AiZsy4ZYZMYS0",
    privateKey: "dvO7Bj_Chf_MxRgtRXyk_7t12ksYyDM8qOICHxzMTHQ"
}

webpush.setVapidDetails(
    'mailto:fulanito@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);