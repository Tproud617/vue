<template>
  <router-view />
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
</style>