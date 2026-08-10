import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base` se define en el workflow de GitHub Pages (VITE_BASE=/<repo>/).
// En local queda en "/" para que `npm run dev` funcione sin configuracion.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
})
