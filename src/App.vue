<template>
  <div class="app-container">
    <el-menu mode="horizontal" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/recommend">推荐</el-menu-item>
      <el-menu-item index="/about">关于</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePhoneStore } from '@/stores/phone'
import { isLocalStorageSupported } from '@/utils/storage'

const phoneStore = usePhoneStore()

onMounted(async () => {
  // 检查localStorage支持
  if (!isLocalStorageSupported()) {
    console.warn('浏览器不支持localStorage，数据将无法持久化保存')
  }
  
  // 初始化手机商店数据
  await phoneStore.initialize()
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-menu {
  margin-bottom: 20px;
}
</style>