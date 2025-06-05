<template>
  <div class="app-container">
    <div class="nav-bar">
      <el-menu 
        mode="horizontal" 
        router 
        :default-active="$route.path"
        class="custom-menu"
      >
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/recommend">
          <el-icon><Search /></el-icon>
          <span>推荐</span>
        </el-menu-item>
        <el-menu-item index="/compare">
          <el-icon><Operation /></el-icon>
          <span>对比</span>
          <div class="badge-container">
            <transition name="badge-pop">
              <el-badge v-if="compareCount > 0" :value="compareCount" class="compare-badge" />
            </transition>
          </div>
        </el-menu-item>
        <el-menu-item index="/favorite">
          <el-icon><Star /></el-icon>
          <span>收藏</span>
          <div class="badge-container">
            <transition name="badge-pop">
              <el-badge v-if="favoriteCount > 0" :value="favoriteCount" class="favorite-badge" />
            </transition>
          </div>
        </el-menu-item>
        <el-menu-item index="/about">
          <el-icon><InfoFilled /></el-icon>
          <span>关于</span>
        </el-menu-item>
      </el-menu>
    </div>
    
    <router-view v-slot="{ Component }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { usePhoneStore } from '@/stores/phone'
import { useRouter } from 'vue-router'
import { HomeFilled, Search, Operation, Star, InfoFilled } from '@element-plus/icons-vue'

const router = useRouter()
const phoneStore = usePhoneStore()

// 计算对比列表中的手机数量
const compareCount = computed(() => phoneStore.compareList.length)

// 计算收藏列表中的手机数量
const favoriteCount = computed(() => phoneStore.favoriteList.length)

onMounted(() => {
  try {
    // 测试 localStorage 是否可用
    localStorage.setItem('test', 'test')
    localStorage.removeItem('test')
    
    // 初始化手机商店数据
    phoneStore.initialize()
  } catch (e) {
    console.warn('浏览器不支持localStorage，数据将无法持久化保存')
  }
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.custom-menu {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 70px;
  border-bottom: none !important;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.97));
  backdrop-filter: blur(10px);
}

/* 菜单项样式 */
.el-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 70px;
  font-weight: 500;
  font-size: 1.05rem;
  padding: 0 25px !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
  position: relative;
}

/* 添加菜单项底部指示线动画 */
.el-menu-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(to right, #42b983, #2f9768);
  transition: width 0.3s ease;
  border-radius: 3px 3px 0 0;
}

.el-menu-item:hover::after,
.el-menu-item.is-active::after {
  width: 70%;
}

.el-menu-item.is-active {
  color: #42b983 !important;
  font-weight: 600;
}

.el-menu-item:hover {
  background-color: rgba(66, 185, 131, 0.05) !important;
  color: #42b983 !important;
  transform: translateY(-2px);
}

.el-menu-item .el-icon {
  font-size: 1.1rem;
  margin-right: 2px;
  transition: transform 0.3s ease;
}

.el-menu-item:hover .el-icon {
  transform: scale(1.2);
}

.badge-container {
  position: relative;
  width: 20px;
  height: 20px;
  margin-left: 4px;
}

.compare-badge, .favorite-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  transform: translate(0, 0);
}

.compare-badge :deep(.el-badge__content) {
  background-color: #409EFF;
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.3);
}

.favorite-badge :deep(.el-badge__content) {
  background-color: #f56c6c;
  box-shadow: 0 4px 8px rgba(245, 108, 108, 0.3);
}

/* 徽章弹出动画 */
.badge-pop-enter-active, .badge-pop-leave-active {
  transition: all 0.3s cubic-bezier(0, 1.44, 0.84, 1.15);
}

.badge-pop-enter-from, .badge-pop-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

/* 路由过渡效果 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .el-menu-item {
    padding: 0 15px !important;
  }
  
  .el-menu-item span {
    font-size: 0.9rem;
  }
}
</style>