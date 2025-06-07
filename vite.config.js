// vite.config.js - Vite构建工具配置文件
import { defineConfig } from 'vite' // 导入Vite配置函数
import vue from '@vitejs/plugin-vue' // 导入Vue插件

const path = require('path') // 导入Node.js路径处理模块

export default defineConfig({
  base: '/vue/',  // 部署基础路径 - 从 '/' 改为 '/vue/'，用于部署到子目录
  plugins: [vue()], // 启用Vue插件，支持.vue单文件组件
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 路径别名配置，@ 指向源码目录
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined // 不手动分割代码块，使用默认策略
      }
    }
  },
  build: {
    outDir: 'dist', // 输出目录设置为dist
    emptyOutDir: true // 构建前清空输出目录
  }
})