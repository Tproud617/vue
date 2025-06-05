import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 添加更强的全局导航错误处理
router.onError((err) => {
  console.error('路由导航错误:', err)
  console.trace('路由错误栈跟踪')
})

router.beforeEach((to, from, next) => {
  console.log(`导航: 从 ${from.path} 到 ${to.path}, 参数:`, to.params)
  // 确保路由参数处理正确
  if (to.name === 'Detail' && to.params.id) {
    console.log('导航到详情页，ID:', to.params.id)
  }
  next()
})

router.afterEach((to) => {
  console.log(`导航完成: ${to.path}`)
})

const app = createApp(App)
const pinia = createPinia()

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue错误:', err)
  console.log('错误组件:', vm)
  console.log('错误信息:', info)
}

app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')