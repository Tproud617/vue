<template>
  <div class="app-container">
    <div class="nav-bar">
      <el-menu mode="horizontal" router :default-active="$route.path">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/recommend">推荐</el-menu-item>
        <el-menu-item index="/compare">
          对比
          <el-badge v-if="compareCount > 0" :value="compareCount" class="compare-badge" />
        </el-menu-item>
        <el-menu-item index="/favorite">
          收藏
          <el-badge v-if="favoriteCount > 0" :value="favoriteCount" class="favorite-badge" />
        </el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
      </el-menu>
    </div>
    
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { usePhoneStore } from '@/stores/phone'
import { useRouter } from 'vue-router'

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
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.el-menu {
  border-bottom: none !important;
}

.compare-badge, .favorite-badge {
  margin-left: 6px;
}

.favorite-badge :deep(.el-badge__content) {
  background-color: #f56c6c;
}
</style>