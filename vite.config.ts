import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Cloudflare Pages sirve desde la raiz de zapsanar.pages.dev, no desde una
// subcarpeta, asi que `base` se queda en "/". Solo habria que tocarlo si el
// sitio volviera a vivir dentro de una subcarpeta, como pasa en un sitio de
// proyecto de GitHub Pages.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
