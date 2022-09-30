import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import postcss from './postcss.config.js'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  css : {
    postcss
  },
  server: {
    hmr: {
        overlay: false,
    }
  }
})
