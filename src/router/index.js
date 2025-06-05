import { createRouter, createWebHistory } from 'vue-router'

// 解决基础路径问题
const baseUrl = import.meta.env.MODE === 'production' ? '/vue/' : '/' // 生产环境使用/vue/，开发环境使用/

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import('@/views/RecommendView.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/DetailView.vue'),
    props: true // 将路由参数作为props传递给组件
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/compare',
    name: 'Compare',
    component: () => import('@/views/CompareView.vue')
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () => import('@/views/FavoriteView.vue')
  },
  // 添加一个通配符路由，捕获所有不匹配的路径
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: {
      template: `
        <div style="padding: 20px; text-align: center;">
          <h2>页面未找到</h2>
          <p>请检查URL是否正确。</p>
          <button @click="goHome">返回首页</button>
        </div>
      `,
      methods: {
        goHome() {
          this.$router.push('/')
        }
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

// 导航前的调试日志
router.beforeEach((to, from, next) => {
  console.log(`导航: 从 ${from.fullPath} 到 ${to.fullPath}, 路由参数:`, to.params)
  next()
})

// 导航后的日志记录
router.afterEach((to) => {
  console.log(`导航完成: ${to.fullPath}`)
})

// 错误处理
router.onError((error) => {
  console.error('路由错误:', error)
})

export default router