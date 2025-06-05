import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

export default defineConfig({
  // 开发模式下不使用基础URL，便于调试
  base: '/',  // 已修改：从 '/vue/' 改为 '/'
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