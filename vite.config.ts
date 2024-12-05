import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: { port: 3000 },
  base: "/reconstruction_front", // Замените RepoName на имя вашего репозитория
  plugins: [react()],
  server: {
    host:"localhost",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
  },
})