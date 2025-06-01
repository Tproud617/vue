import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 添加全局导航错误处理
router.onError((err) => {
  console.error('路由导航错误:', err)
})

router.beforeEach((to, from, next) => {
  console.log(`导航: 从 ${from.path} 到 ${to.path}`)
  next()
})

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')