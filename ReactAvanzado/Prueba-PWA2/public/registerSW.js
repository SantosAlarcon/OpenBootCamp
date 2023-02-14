const vapidKeys = {
    publicKey: "BCzTdA2PYgPzsN3CFsT93KWZX9m5wL8VNgzlxUqy4faz0OVSIhvW-x_1e0wZq4OwDW2kOEKWV3AiZsy4ZYZMYS0",
    privateKey: "dvO7Bj_Chf_MxRgtRXyk_7t12ksYyDM8qOICHxzMTHQ"
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { scope: '/' })
            .then(registration => {
                registration.pushManager.getSubscription()
                    .then(async sub => {
                        const pushSubscription = await registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: vapidKeys.publicKey
                        });

                        // Esto se envía al servidor.
                        await fetch("http://localhost:8000/subscription", {
                            method: 'POST',
                            body: JSON.stringify(pushSubscription)
                        });
                    });
                console.log("Service Worker funcionando: ", registration);
            }).catch(regError => {
                console.log("El Service Worker no se ha cargado: ", regError);
            })
    })
}