import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'   // module Node pour construire des chemins fiables (Windows/Mac/Linux)
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // "@"  →  dossier src/ . __dirname = dossier où se trouve ce fichier de config.
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Anticipation back-end : quand on aura une API Node sur le port 3000,
  // cette ligne redirigera /api/* vers elle SANS problème de CORS en dev.
  // Désactivé pour l'instant (commenté) : pas d'API encore.
  // server: {
  //   proxy: { '/api': 'http://localhost:3000' },
  // },
})