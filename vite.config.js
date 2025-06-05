import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

export default defineConfig({
  base: '/vue/',  // 已修改：从 '/' 改为 '/vue/'
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})