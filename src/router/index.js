// router/index.js - 路由配置文件，定义应用的所有路由和导航钩子

import { createRouter, createWebHistory } from 'vue-router' // 引入Vue Router核心函数

// 解决基础路径问题 - 根据环境设置不同的基础路径
const baseUrl = import.meta.env.MODE === 'production' ? '/vue/' : '/' // 生产环境使用/vue/，开发环境使用/

// 路由配置数组 - 定义应用所有页面路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue') // 首页路由 - 使用懒加载方式导入
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import('@/views/RecommendView.vue') // 推荐页路由 - 展示手机推荐列表
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/DetailView.vue'), // 详情页路由 - 展示单个手机详情
    props: true // 将路由参数作为props传递给组件，方便组件内部使用
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue') // 关于页路由
  },
  {
    path: '/compare',
    name: 'Compare',
    component: () => import('@/views/CompareView.vue') // 对比页路由 - 多手机参数对比
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () => import('@/views/FavoriteView.vue') // 收藏页路由 - 展示用户收藏的手机
  },
  // 添加一个通配符路由，捕获所有不匹配的路径 - 404页面处理
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

// 创建路由实例
const router = createRouter({
  history: createWebHistory(baseUrl), // 使用HTML5历史模式，传入基础路径
  routes, // 路由配置
  scrollBehavior() {
    // 当路由切换时，始终滚动到页面顶部
    return { top: 0 }
  }
})

// 导航前的调试日志 - 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log(`导航: 从 ${from.fullPath} 到 ${to.fullPath}, 路由参数:`, to.params)
  next() // 继续导航流程
})

// 导航后的日志记录 - 全局后置钩子
router.afterEach((to) => {
  console.log(`导航完成: ${to.fullPath}`)
})

// 错误处理 - 路由错误监听
router.onError((error) => {
  console.error('路由错误:', error)
})

export default router // 导出路由实例供应用使用