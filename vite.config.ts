import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// El sitio se sirve desde la raiz del dominio en Cloudflare, asi que `base`
// se queda en "/". Solo habria que tocarlo si volviera a publicarse dentro de
// una subcarpeta.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
