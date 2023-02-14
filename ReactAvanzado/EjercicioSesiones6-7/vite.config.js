import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: '/',
      filename: "./public/sw.js",
      registerType: 'autoUpdate',
      injectRegister: "script",
      devOptions: { enabled: true },
      manifest: {
        "name": "Creador de notificaciones",
        "short_name": "creador-notificaciones",
        "description": "Este es una aplicación que envía notificaciones del cliente al servidor.",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#006",
        "theme_color": "#006",
        "lang": "es",
        "id": "/",
        "icons": [
          {
            "src": "./vite512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "./vite144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "any"
          }
        ]
      }
    })
  ],
})
