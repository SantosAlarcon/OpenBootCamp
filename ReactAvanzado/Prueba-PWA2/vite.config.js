import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      devOptions: { enabled: true },
      manifest: {
        "name": "Mi app de compras",
        "short_name": "mi-app-de-compras",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#006",
        "theme_color": "#006",
        "lang": "es",
        "scope": "/",
        "icons": [
          {
            "src": "./vite512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "./vite144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ]
      }
    })
  ],
})
