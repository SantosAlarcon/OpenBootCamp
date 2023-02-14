self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Este listener es necesario para hacer que la aplicación se ejecute sin conexión.
self.addEventListener('fetch', event => {
  /* console.log("La aplicación está lista para ser instalada y sin conexión"); */
});

/** En el momento que se detecte una nueva versión de la app, se mandará
 * una notificación al usuario para avisarle de que hay una nueva versión.
*/
self.addEventListener('install', event => {
  console.log("SW instalado");
});

/**
 * Este listener actúa enviando una notificación al usuario cuando se ha activado
 * la nueva versión de la app.
 */
self.addEventListener('activate', event => {
  console.log("SW activado");
});

// Este listener actuará cuando se envien datos al servidor
self.addEventListener('push', event => {
  // Se recogen los datos del push
  const datos = event.data.json();
  console.log(">>> Se ha enviado el push al servidor.");

  // Se muestra una notificación con el título y el cuerpo del mismo.
  self.registration.showNotification(datos.title, {body: datos.body})
})