// main.js - 应用程序的入口文件，负责初始化Vue应用及其插件

// 导入核心依赖
import { createApp } from 'vue' // Vue 3核心创建应用函数
import { createPinia } from 'pinia' // Pinia状态管理库
import App from './App.vue' // 根组件
import router from './router' // 路由配置
import ElementPlus from 'element-plus' // Element Plus UI组件库
import 'element-plus/dist/index.css' // Element Plus样式

// 路由错误处理 - 捕获路由导航过程中的错误
router.onError((err) => {
  console.error('路由导航错误:', err)
  console.trace('路由错误栈跟踪')
})

// 全局前置守卫 - 在路由跳转前执行
router.beforeEach((to, from, next) => {
  console.log(`导航: 从 ${from.path} 到 ${to.path}, 参数:`, to.params)
  // 确保路由参数处理正确 - 特别检查详情页的ID参数
  if (to.name === 'Detail' && to.params.id) {
    console.log('导航到详情页，ID:', to.params.id)
  }
  next() // 继续路由导航
})

// 全局后置钩子 - 在路由跳转完成后执行
router.afterEach((to) => {
  console.log(`导航完成: ${to.path}`)
})

// 创建Vue应用实例
const app = createApp(App)
// 创建Pinia实例 - 用于状态管理
const pinia = createPinia()

// 全局错误处理 - 捕获应用中的Vue错误
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue错误:', err)
  console.log('错误组件:', vm)
  console.log('错误信息:', info)
}

// 注册插件
app.use(router) // 注册路由
app.use(ElementPlus) // 注册Element Plus组件库
app.use(pinia) // 注册Pinia状态管理
app.mount('#app') // 挂载应用到DOM