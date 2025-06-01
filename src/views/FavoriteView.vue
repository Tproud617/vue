<template>
  <div class="favorite-view">
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>
    
    <el-container>
      <el-header>
        <h1 class="header-title">
          <el-icon class="header-icon"><star /></el-icon>
          我的收藏
        </h1>
        <div class="header-actions">
          <el-button 
            type="danger" 
            @click="clearFavoriteList" 
            :disabled="favoritePhones.length === 0"
            class="clear-btn"
          >
            <el-icon><delete /></el-icon>
            清空收藏
          </el-button>
        </div>
      </el-header>
      
      <el-main>
        <el-empty 
          v-if="favoritePhones.length === 0" 
          description="收藏列表为空" 
          :image-size="200"
          class="empty-container"
        >
          <p class="empty-description">您还没有收藏任何手机，快去挑选您喜欢的手机吧！</p>
          <el-button type="primary" @click="goToRecommend" size="large" class="add-phone-btn">
            <el-icon><top-right /></el-icon>
            去推荐页面
          </el-button>
        </el-empty>
        
        <div v-else class="favorite-container">
          <div class="favorite-header">
            <h2 class="favorite-title">已收藏 {{ favoritePhones.length }} 台手机</h2>
          </div>
          
          <div class="phone-grid">
            <el-card 
              v-for="phone in favoritePhones" 
              :key="phone.id"
              class="phone-card"
              shadow="hover"
            >
              <div class="phone-card-inner">
                <div class="phone-image-container">
                  <img :src="phone.image" :alt="phone.name" class="phone-image">
                  <div class="actions-overlay">
                    <el-button 
                      type="danger" 
                      circle 
                      @click="removeFromFavorite(phone.id)"
                      class="remove-btn"
                      title="移除收藏"
                    >
                      <el-icon><close /></el-icon>
                    </el-button>
                  </div>
                </div>
                <h3 class="phone-title">{{ phone.name }}</h3>
                <div class="phone-info">
                  <el-tag size="small" effect="dark" type="success" class="brand-badge">{{ phone.brand }}</el-tag>
                  <span class="price">¥{{ phone.price.toLocaleString() }}</span>
                </div>

                <!-- 手机参数 -->
                <div class="phone-specs">
                  <div class="spec-item">
                    <el-tooltip content="存储容量" placement="top" effect="light">
                      <i class="el-icon spec-icon">💾</i>
                      <span>{{ phone.storage }}GB</span>
                    </el-tooltip>
                  </div>
                  <div class="spec-item">
                    <el-tooltip content="屏幕尺寸" placement="top" effect="light">
                      <i class="el-icon spec-icon">📱</i>
                      <span>{{ phone.screen }}"</span>
                    </el-tooltip>
                  </div>
                </div>

                <div class="phone-ratings">
                  <div class="rating-item">
                    <span class="rating-label">相机</span>
                    <el-rate v-model="phone.camera" disabled size="small" class="custom-rate"/>
                  </div>
                  <div class="rating-item">
                    <span class="rating-label">性能</span>
                    <el-rate v-model="phone.performance" disabled size="small" class="custom-rate"/>
                  </div>
                  <div class="rating-item">
                    <span class="rating-label">电池</span>
                    <el-rate v-model="phone.battery" disabled size="small" class="custom-rate"/>
                  </div>
                </div>

                <el-button 
                  type="primary" 
                  @click="viewDetail(phone.id)"
                  size="default"
                  class="detail-btn"
                >
                  <el-icon><view /></el-icon> 查看详情
                </el-button>
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePhoneStore } from '@/stores/phone'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Delete, TopRight, Close, Star, View } from '@element-plus/icons-vue'

const router = useRouter()
const phoneStore = usePhoneStore()

// 获取收藏列表中的手机
const favoritePhones = computed(() => phoneStore.favoritePhones)

// 从收藏列表中移除手机
const removeFromFavorite = (phoneId) => {
  ElMessageBox.confirm('确定要从收藏列表中移除这台手机吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    phoneStore.removeFromFavorite(phoneId)
    ElMessage.success('已从收藏列表中移除')
  }).catch(() => {
    // 用户取消操作
  })
}

// 清空收藏列表
const clearFavoriteList = async () => {
  try {
    await ElMessageBox.confirm('确定要清空收藏列表吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    phoneStore.clearFavoriteList()
    ElMessage.success('收藏列表已清空')
  } catch {
    // 用户取消操作
  }
}

// 跳转到推荐页面
const goToRecommend = () => {
  router.push('/recommend')
}

// 查看手机详情
const viewDetail = (id) => {
  console.log('从收藏页跳转到详情页，ID:', id)
  router.push(`/detail/${id}`)
}
</script>

<style scoped>
.favorite-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
}

.bg-gradient-1,
.bg-gradient-2 {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.5;
}

.bg-gradient-1 {
  background: radial-gradient(circle, rgba(66, 185, 131, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 60vw;
  height: 60vw;
  top: -20vw;
  right: -20vw;
  animation: float-1 15s ease-in-out infinite alternate;
}

.bg-gradient-2 {
  background: radial-gradient(circle, rgba(91, 143, 249, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 70vw;
  height: 70vw;
  bottom: -30vw;
  left: -20vw;
  animation: float-2 20s ease-in-out infinite alternate;
}

@keyframes float-1 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-5vw, 5vw);
  }
}

@keyframes float-2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(5vw, -5vw);
  }
}

.el-container {
  position: relative;
  z-index: 1;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px !important;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-title {
  font-size: 1.8rem;
  background: linear-gradient(to right, #f56c6c, #e04f4f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  font-size: 24px;
  color: #f56c6c;
}

.clear-btn {
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 8px;
}

.clear-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.2);
}

.el-main {
  padding: 30px;
}

.empty-container {
  margin-top: 40px;
  animation: fade-in 0.8s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.empty-description {
  color: #909399;
  font-size: 16px;
  margin: 20px 0;
}

.add-phone-btn {
  padding: 12px 24px;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
}

.add-phone-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(64, 158, 255, 0.3);
}

.favorite-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);
  animation: slide-up 0.8s ease-out;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 20px;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.favorite-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.favorite-title {
  margin: 0;
  color: #303133;
  font-size: 18px;
  font-weight: 600;
}

.phone-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.phone-card {
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: none;
  overflow: hidden;
  background: transparent;
  perspective: 1000px;
}

.phone-card-inner {
  background: white;
  border-radius: 16px;
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.phone-card:hover {
  transform: translateY(-10px) scale(1.02);
  z-index: 2;
}

.phone-card:hover .phone-card-inner {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.phone-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: #f8f9fa;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-image {
  width: 80%;
  height: 90%;
  object-fit: contain;
  transition: all 0.5s ease;
}

.phone-card:hover .phone-image {
  transform: scale(1.1);
}

.actions-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.phone-card:hover .actions-overlay {
  opacity: 1;
}

.remove-btn {
  transform: scale(0.8);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.remove-btn:hover {
  transform: scale(1);
}

.phone-title {
  margin: 15px 0 8px;
  font-size: 16px;
  color: #303133;
  font-weight: 600;
  height: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.phone-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.brand-badge {
  padding: 4px 8px;
  border-radius: 6px;
}

.price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: 700;
}

.phone-specs {
  display: flex;
  justify-content: space-around;
  margin: 12px 0;
  padding: 10px;
  background: rgba(64, 158, 255, 0.1);
  border-radius: 10px;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #409EFF;
  font-weight: 500;
}

.spec-icon {
  font-size: 16px;
}

.phone-ratings {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 15px 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
}

.rating-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rating-label {
  color: #606266;
  font-size: 14px;
  width: 40px;
  font-weight: 500;
}

.custom-rate {
  --el-rate-icon-size: 18px;
}

.detail-btn {
  width: 100%;
  margin-top: auto;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.detail-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.3);
}

@media (max-width: 1200px) {
  .phone-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .favorite-view {
    padding: 0;
  }
  
  .el-main {
    padding: 20px 15px;
  }
  
  .el-header {
    padding: 0 15px;
    height: auto !important;
    min-height: 70px;
    flex-wrap: wrap;
  }
  
  .header-title {
    font-size: 1.5rem;
    margin: 10px 0;
  }
  
  .clear-btn {
    margin: 10px 0;
  }
  
  .phone-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .phone-image-container {
    height: 180px;
  }
}

@media (max-width: 576px) {
  .el-main {
    padding: 15px 10px;
  }
  
  .phone-grid {
    grid-template-columns: 1fr;
  }
  
  .phone-title {
    font-size: 14px;
  }
  
  .favorite-header {
    padding: 0 0 15px;
  }
}
</style> 