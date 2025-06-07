<!-- 收藏页面组件 - 展示和管理用户收藏的手机 -->
<template>
  <div class="favorite-view">
    <!-- 背景渐变效果 -->
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>
    <div class="bg-gradient-3"></div>
    
    <el-container>
      <!-- 顶部标题栏 -->
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
        <!-- 空状态展示 - 当收藏列表为空时显示 -->
        <div 
          v-if="favoritePhones.length === 0" 
          class="empty-container"
        >
          <div class="empty-illustration">
            <div class="empty-icon">
              <el-icon><star /></el-icon>
            </div>
            <div class="empty-phones">
              <div class="empty-phone phone1"></div>
              <div class="empty-phone phone2"></div>
              <div class="empty-phone phone3"></div>
            </div>
          </div>
          <h2 class="empty-title">收藏列表为空</h2>
          <p class="empty-description">您还没有收藏任何手机，快去挑选您喜欢的手机吧！</p>
          <el-button type="primary" @click="goToRecommend" size="large" class="add-phone-btn">
            <el-icon><top-right /></el-icon>
            去推荐页面
          </el-button>
        </div>
        
        <!-- 收藏内容 - 当有收藏手机时显示 -->
        <transition name="fade-scale" v-else>
          <div class="favorite-container">
          <!-- 收藏头部信息 -->
          <div class="favorite-header">
            <h2 class="favorite-title">已收藏 {{ favoritePhones.length }} 台手机</h2>
              <div class="favorite-sort">
                <el-tooltip content="按添加时间排序" placement="top">
                  <el-button circle size="small" class="sort-btn">
                    <el-icon><timer /></el-icon>
                  </el-button>
                </el-tooltip>
              </div>
          </div>
          
            <!-- 手机卡片网格 - 使用过渡动画 -->
            <transition-group name="phone-list" tag="div" class="phone-grid">
            <el-card 
              v-for="phone in favoritePhones" 
              :key="phone.id"
              class="phone-card"
              shadow="hover"
            >
              <div class="phone-card-inner">
                <!-- 手机图片展示区 -->
                <div class="phone-image-container">
                  <img :src="phone.image" :alt="phone.name" class="phone-image">
                  <!-- 操作按钮浮层 -->
                  <div class="actions-overlay">
                      <div class="action-buttons">
                    <el-button 
                      type="danger" 
                      circle 
                      @click="removeFromFavorite(phone.id)"
                      class="remove-btn"
                      title="移除收藏"
                    >
                      <el-icon><close /></el-icon>
                    </el-button>
                        <el-button 
                          type="primary" 
                          circle 
                          @click="viewDetail(phone.id)"
                          class="view-btn"
                          title="查看详情"
                        >
                          <el-icon><view /></el-icon>
                        </el-button>
                      </div>
                    </div>
                  </div>
                  
                <!-- 手机基本信息 -->
                <h3 class="phone-title">{{ phone.name }}</h3>
                <div class="phone-info">
                  <el-tag size="small" effect="dark" type="success" class="brand-badge">{{ phone.brand }}</el-tag>
                  <span class="price">¥{{ phone.price.toLocaleString() }}</span>
                </div>

                <!-- 手机规格信息 -->
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

                <!-- 性能评分展示 -->
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

                <!-- 查看详情按钮 -->
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
            </transition-group>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePhoneStore } from '@/stores/phone'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Delete, TopRight, Close, Star, View, Timer } from '@element-plus/icons-vue'

const router = useRouter()
const phoneStore = usePhoneStore()

// 获取收藏列表中的手机数据
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

// 清空收藏列表 - 移除所有收藏的手机
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

// 跳转到推荐页面 - 用于添加更多手机
const goToRecommend = () => {
  router.push('/recommend')
}

// 查看手机详情 - 跳转到详情页面
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
  padding-bottom: 40px;
}

.bg-gradient-1,
.bg-gradient-2,
.bg-gradient-3 {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.6;
}

.bg-gradient-1 {
  background: radial-gradient(circle, rgba(245, 108, 108, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 70vw;
  height: 70vw;
  top: -20vw;
  right: -20vw;
  animation: float-1 20s ease-in-out infinite alternate;
}

.bg-gradient-2 {
  background: radial-gradient(circle, rgba(91, 143, 249, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 80vw;
  height: 80vw;
  bottom: -30vw;
  left: -20vw;
  animation: float-2 25s ease-in-out infinite alternate;
}

.bg-gradient-3 {
  background: radial-gradient(circle, rgba(245, 108, 108, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 90vw;
  height: 90vw;
  top: -40vw;
  left: -40vw;
  animation: float-3 30s ease-in-out infinite alternate;
}

@keyframes float-1 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-8vw, 8vw);
  }
}

@keyframes float-2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(8vw, -8vw);
  }
}

@keyframes float-3 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-10vw, 10vw);
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
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0 25px;
}

.header-title {
  font-size: 2rem;
  background: linear-gradient(to right, #f56c6c, #e6a23c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 12px;
  filter: drop-shadow(0 2px 3px rgba(245, 108, 108, 0.2));
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.header-title:hover {
  transform: scale(1.02);
  filter: drop-shadow(0 3px 5px rgba(245, 108, 108, 0.3));
}

.header-icon {
  font-size: 28px;
  color: #f56c6c;
  animation: pulse-star 2s infinite;
  transform-origin: center;
}

@keyframes pulse-star {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

.clear-btn {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.clear-btn:hover:not(:disabled) {
  transform: translateY(-4px);
  box-shadow: 0 8px 15px rgba(245, 108, 108, 0.3);
}

.clear-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0) 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.clear-btn:hover:not(:disabled)::before {
  transform: translateX(100%);
}

.el-main {
  padding: 30px;
}

.empty-container {
  margin-top: 40px;
  animation: fade-in 1s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
  margin: 60px auto;
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

.empty-illustration {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-icon {
  font-size: 64px;
  color: #f56c6c;
  margin-bottom: 30px;
  animation: pulse-star-empty 2s ease-in-out infinite;
  transform-origin: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(245, 108, 108, 0.2);
}

@keyframes pulse-star-empty {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.empty-phones {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}

.empty-phone {
  width: 15px;
  height: 40px;
  background-color: #f56c6c;
  border-radius: 4px;
  position: relative;
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.phone1 {
  animation-name: float-phone;
  animation-delay: 0s;
}

.phone2 {
  height: 50px;
  animation-name: float-phone;
  animation-delay: 0.3s;
}

.phone3 {
  height: 45px;
  animation-name: float-phone;
  animation-delay: 0.6s;
}

@keyframes float-phone {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.empty-title {
  color: #303133;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(to right, #f56c6c, #e6a23c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 2px rgba(245, 108, 108, 0.1));
}

.empty-description {
  color: #606266;
  font-size: 16px;
  margin: 15px 0 30px;
  max-width: 300px;
  line-height: 1.6;
}

.add-phone-btn {
  padding: 14px 28px !important;
  font-size: 16px !important;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  border-radius: 10px !important;
  background: linear-gradient(135deg, #409EFF, #337ecc) !important;
  border: none !important;
  position: relative !important;
  overflow: hidden !important;
  box-shadow: 0 8px 15px rgba(64, 158, 255, 0.3) !important;
}

.add-phone-btn:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 15px 25px rgba(64, 158, 255, 0.4) !important;
}

.add-phone-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.add-phone-btn:hover::before {
  transform: translateX(100%);
}

.favorite-container {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(15px);
  animation: slide-up 0.8s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 25px;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(50px);
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
  margin-bottom: 10px;
}

.favorite-title {
  margin: 0;
  color: #303133;
  font-size: 20px;
  font-weight: 700;
  position: relative;
  display: inline-block;
}

.favorite-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(to right, #f56c6c, #e6a23c);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.favorite-title:hover::after {
  width: 100%;
}

.favorite-sort {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-btn {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: linear-gradient(120deg, #f56c6c, #e6a23c);
  color: white;
}

.sort-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 15px rgba(245, 108, 108, 0.3);
}

.phone-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.phone-card {
  border-radius: 16px;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: none;
  overflow: hidden;
  background: transparent;
  perspective: 1200px;
  transform: translateZ(0);
}

.phone-card-inner {
  background: white;
  border-radius: 16px;
  padding: 18px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
  transform-style: preserve-3d;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.phone-card:hover {
  transform: translateY(-12px) scale(1.03);
  z-index: 10;
}

.phone-card:hover .phone-card-inner {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.phone-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: linear-gradient(145deg, #f0f2f5, #ffffff);
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.05);
}

.phone-image {
  width: 85%;
  height: 85%;
  object-fit: contain;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1));
}

.phone-card:hover .phone-image {
  transform: scale(1.12) translateY(-8px);
  filter: drop-shadow(0 15px 20px rgba(0, 0, 0, 0.2));
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

.action-buttons {
  display: flex;
  gap: 10px;
}

.remove-btn {
  transform: scale(0.8);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.remove-btn:hover {
  transform: scale(1);
}

.view-btn {
  transform: scale(0.8);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.view-btn:hover {
  transform: scale(1);
}

.phone-title {
  margin: 18px 0 10px;
  font-size: 17px;
  color: #303133;
  font-weight: 600;
  height: 44px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease;
}

.phone-card:hover .phone-title {
  color: #f56c6c;
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
  padding: 12px;
  background: linear-gradient(145deg, #f7faff, #e6f7ff);
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(64, 158, 255, 0.1);
  transition: all 0.3s ease;
}

.phone-card:hover .phone-specs {
  box-shadow: inset 0 0 8px rgba(64, 158, 255, 0.2);
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
  padding: 15px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.01));
  border-radius: 10px;
  transition: background 0.3s ease;
}

.phone-card:hover .phone-ratings {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.02));
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
  border-radius: 10px;
  padding: 12px 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  border: none !important;
  background: linear-gradient(to right, #409EFF, #337ecc) !important;
  color: white !important;
}

.detail-btn:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 8px 20px rgba(64, 158, 255, 0.4) !important;
}

.detail-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.detail-btn:hover::before {
  transform: translateX(100%);
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

/* 添加淡入缩放过渡效果 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* 添加列表项动画 */
.phone-list-enter-active,
.phone-list-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.phone-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.phone-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.phone-list-move {
  transition: transform 0.5s;
}
</style> 