import { vapidKeys } from "./index";

//register the service worker, register our push api, send the notification
async function registerServiceWorker(){
    //register service worker
    const register = await navigator.serviceWorker.register('./sw.js', {
        scope: '/subscription'
    });

    //register push
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,

        //public vapid key
        applicationServerKey: vapidKeys.publicKey
    });
   
    //Send push notification
    await fetch("/subscription", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
}