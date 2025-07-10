import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 将 `@` 映射到 `src/` 目录

    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Django 后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 可选：重写路径
      }
    }
  }
})
