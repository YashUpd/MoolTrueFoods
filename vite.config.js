import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true, // Expose to local network inside container
    watch: {
      usePolling: true, // Enable polling for Windows host volume mount syncs
    },
    proxy: {
      // Proxy /api requests dynamically based on context (Docker container vs local host)
      '/api': {
        target: process.env.DOCKER ? 'http://backend:5000' : 'http://localhost:5000',
        changeOrigin: true,
      },
      // Proxy WebSocket connections for Socket.io (Chat Support)
      '/socket.io': {
        target: process.env.DOCKER ? 'http://backend:5000' : 'http://localhost:5000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
