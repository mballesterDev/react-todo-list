import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Ruta del repositorio en GitHub Pages: https://mballesterdev.github.io/react-todo-list/
  base: '/react-todo-list/',
  plugins: [react(), tailwindcss()],
})
