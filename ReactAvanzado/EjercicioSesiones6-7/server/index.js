const express = require('express');
const cors = require('cors');
const webpush = require('web-push');
const { send } = require('vite');

// Middlewares
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const vapidKeys = {
    "publicKey": "BOTSBhjA_tIDlkmMs1qJ7tan-wS2CkGRykYUHHmDZYpR_qjlNRX0JpGrUOnhifWD0_IQTj3GCYOzl8cYt40v5nU", "privateKey": "iwA-Fv-JGN4_Lh0YitRE2yZncyP09YnH8Ga3JrpFSfQ"
}

webpush.setVapidDetails(
    'mailto:fulanito@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const pushSubscription = {
    endpoint: 'https://wns2-db5p.notify.windows.com/w/?token=BQYAAAAlh3siGp4yIuWD75P%2bPF2ZD5v3FQAQxL%2f7RGRxCLfsWW4YKR6k28cVF0OkvNpN6ObfYqLLi6B6dIzBfjVTfttx0ynFR9F6Ht1pOEe%2bx%2bkLfh%2bO3tuH4R1jmX7XBzgaLlLOm7Wd%2bpKttB%2bkUOg95s3tPK%2bf5E8ADrtU4qR3WjlmCH1DhkGcIqkPtTiIfuajOuGky88OtZi9xpi7fWLOSk5H1HbzrQ95z2HlVuKGVa61GarinCrTyB61Ya2v5W6qHnbDYe8deCDEwdWdF6CkV2rSdF7%2fnmmaC6Up4b1NSIJqSBFatmnMnBpPSd3lliwCqQo%3d',
    expirationTime: null,
    keys: {
        p256dh: 'BC5D5iiqLtq7vDW-_h-wmq_h9l7aAzM8vzvoujXUbn2q7r-44KzX7DrpnRn9OLjupghZn6_qm37h0IoBRqesdr0',
        auth: 'Idg2JWJUw8-cLDKDgOwMKw'
    }
}

// Rutas
app.get('/', async (req, res) => {
    /*     res.sendStatus(200).json(); */
    const payload = JSON.stringify({ titulo: "Servidor cargado", mensaje: "El servidor ha cargado correctamente." });

    try {
        await webpush.sendNotification(pushSubscription, payload);
        /* await res.send("Enviado"); */
    } catch (e) {
        console.log(e);
    }
})

// Ruta de suscripción
app.post('/subscription', async (req, res) => {
    const datos = req.body;
    console.log(req.body);
    res.sendStatus(201).json();

    const payload = JSON.stringify(datos);

    // Se intenta enviar una notificación con los datos del cliente.
    try {
        await webpush.sendNotification(pushSubscription, payload);
    } catch (e) {
        console.log(e);
    }
})

// Arranca el servidor en el puerto 8000
app.listen(8000, () => console.log("Servidor funcionando"));

const payload2 = {
    title: 'Servidor Express',
    body: 'El servidor Express está funcionando. :3'
};

// Se lanza una notificacion de prueba nada más arrancar Express
webpush.sendNotification(pushSubscription, JSON.stringify(payload2));