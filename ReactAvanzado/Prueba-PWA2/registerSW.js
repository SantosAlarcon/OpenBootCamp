import axios from "axios";

const vapidKeys = {
    publicKey: "BCzTdA2PYgPzsN3CFsT93KWZX9m5wL8VNgzlxUqy4faz0OVSIhvW-x_1e0wZq4OwDW2kOEKWV3AiZsy4ZYZMYS0",
    privateKey: "dvO7Bj_Chf_MxRgtRXyk_7t12ksYyDM8qOICHxzMTHQ"
}

function registerValidSW(swURL, config) {
    navigator.serviceWorker
        /* .register('/dev-sw.js?dev-sw', { scope: '/', type: 'classic' }) */
        .register(swURL)
        .then((registration) => {
            registration.pushManager.getSubscription()
                .then(async sub => {
                    const pushSubscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: vapidKeys.publicKey
                    });
                    await axios.post("http://localhost:8000/subscription", {
                        pushSubscription
                    });
                })
            })
            
}