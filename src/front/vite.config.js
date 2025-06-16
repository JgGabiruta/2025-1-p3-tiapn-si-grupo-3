import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Substitua sua configuração de proxy por esta:
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // O endereço do seu backend
        changeOrigin: true, // Necessário para hospedeiros virtuais
        rewrite: (path) => path.replace(/^\/api/, '') // Remove o /api antes de enviar para o backend
      }
    }
  }
})