import express from "express";
import cors from "cors";
import webpush from 'web-push'

// Middlewares
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const pushSubscription = {
    endpoint: 'https://wns2-db5p.notify.windows.com/w/?token=BQYAAADbInDfWMc4TvKYpS8Afn7QB2VTQ1Xhpe28SmMfoG4%2b1%2fKOGPvxHo6U9pu2V5%2buuud%2bunwZHi8rX%2fsovQ%2b7KXzXZKVlV%2bY0bWt%2b8a9jt6hBCcS7y6oSekO0VCp950cUtWsyk5nEVdtXq0cl1AGjg7EccuP1fUb701So3c%2b95EGxGmFJ8Xj3iNigYZb4lzVLXyZPOlhV1ZHsNWZGb1EojyZ4HoJblORm5oI%2f0Avo5Q%2bXZDA0e0csrCL6bo7bTVpWfv%2bwA2wWm1SZNHXinM%2ff0sM%2btTDiYlWL76RjyAoWu5qEoxpCrLzC6htTVkxg%2bWqWF%2fg%3d',
    expirationTime: null,
    keys: {
      p256dh: 'BILFSVmKmrc8oxvLbxTjN8IjMiBXjn0ylhR298xNSmLb2zrWUct7hsEWrMkfRv9TwGvllV8uYe3TZUVA3IH-RnA',
      auth: 'bQvdrPWvoerv8ZJ5cdfqxA'
    }
}

// Rutas
app.get('/', async(req, res) => {
    res.sendStatus(200).json();
    const payload = JSON.stringify({title: "Servidor cargado", message: "El servidor ha cargado correctamente."});
    try {
        await webpush.sendNotification(pushSubscription, payload);
        await res.send("Enviado");
    } catch (e) {
        console.log(e);
    }
})

// Ruta de suscripción
app.post('/subscription', async(req, res) => {
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