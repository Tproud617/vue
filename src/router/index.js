import { createRouter, createWebHistory } from 'vue-router'

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
    component: () => import('@/views/DetailView.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory('/vue/'),
  routes
})

export default router