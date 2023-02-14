const vapidKeys = { 
    publicKey: "BOTSBhjA_tIDlkmMs1qJ7tan-wS2CkGRykYUHHmDZYpR_qjlNRX0JpGrUOnhifWD0_IQTj3GCYOzl8cYt40v5nU", privateKey: "iwA-Fv-JGN4_Lh0YitRE2yZncyP09YnH8Ga3JrpFSfQ" 
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}    

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js', { scope: '.' })
            .then(registration => {
                // Aquí se configura el tema del Push Manager
                registration.pushManager.getSubscription()
                    .then(async sub => {
                        const pushSubscription = await registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(vapidKeys.publicKey)
                        });

                        // Esto se envía al servidor para obtener los datos de la suscripcion.
                        /* await fetch("http://localhost:8000/subscription", {
                            headers: {
                                "content-type": "application/json"
                            },
                            method: 'POST',
                            mode: 'cors',
                            body: JSON.stringify(pushSubscription)
                        }); */
                    });

                    // Esta es una notificación de prueba para comprobar que la notificación funciona.
                    /* registration.showNotification("Service Worker registrado", {body: "El Service Worker se ha registado con éxito"}); */
                console.log("El Service Worker está registrado.");
            }).catch(regError => {
                console.log("El Service Worker no se ha cargado: ", regError);
            })
    })
}