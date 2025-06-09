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
/* 收藏页面主容器 - 设置基本布局和背景 */
.favorite-view {
  min-height: 100vh; /* 最小高度为视口高度，确保占满整个屏幕 */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); /* 渐变背景，从左上角到右下角 */
  position: relative; /* 相对定位，作为子元素的定位参考 */
  overflow: hidden; /* 隐藏超出容器的内容 */
  padding-bottom: 40px; /* 底部内边距，确保有足够空间 */
}

/* 背景渐变球效果 - 共同样式设置 */
.bg-gradient-1,
.bg-gradient-2,
.bg-gradient-3 {
  position: absolute; /* 绝对定位，相对于父容器 */
  border-radius: 50%; /* 圆形边框 */
  filter: blur(100px); /* 高斯模糊效果，创建柔和的边缘 */
  z-index: 0; /* 层级设置，确保在内容后面 */
  opacity: 0.6; /* 半透明效果 */
}

/* 第一个背景渐变球 - 红色调 */
.bg-gradient-1 {
  background: radial-gradient(circle, rgba(245, 108, 108, 0.3) 0%, rgba(255, 255, 255, 0) 70%); /* 径向渐变，从中心向外扩散 */
  width: 70vw; /* 宽度为视口宽度的70% */
  height: 70vw; /* 高度为视口宽度的70% */
  top: -20vw; /* 顶部偏移，部分在视口外 */
  right: -20vw; /* 右侧偏移，部分在视口外 */
  animation: float-1 20s ease-in-out infinite alternate; /* 应用浮动动画，无限循环交替 */
}

/* 第二个背景渐变球 - 蓝色调 */
.bg-gradient-2 {
  background: radial-gradient(circle, rgba(91, 143, 249, 0.3) 0%, rgba(255, 255, 255, 0) 70%); /* 径向渐变，从中心向外扩散 */
  width: 80vw; /* 宽度为视口宽度的80% */
  height: 80vw; /* 高度为视口宽度的80% */
  bottom: -30vw; /* 底部偏移，部分在视口外 */
  left: -20vw; /* 左侧偏移，部分在视口外 */
  animation: float-2 25s ease-in-out infinite alternate; /* 应用浮动动画，无限循环交替 */
}

/* 第三个背景渐变球 - 红色调 */
.bg-gradient-3 {
  background: radial-gradient(circle, rgba(245, 108, 108, 0.3) 0%, rgba(255, 255, 255, 0) 70%); /* 径向渐变，从中心向外扩散 */
  width: 90vw; /* 宽度为视口宽度的90% */
  height: 90vw; /* 高度为视口宽度的90% */
  top: -40vw; /* 顶部偏移，部分在视口外 */
  left: -40vw; /* 左侧偏移，部分在视口外 */
  animation: float-3 30s ease-in-out infinite alternate; /* 应用浮动动画，无限循环交替 */
}

/* 第一个背景渐变球的浮动动画 */
@keyframes float-1 {
  0% {
    transform: translate(0, 0); /* 起始位置 */
  }
  100% {
    transform: translate(-8vw, 8vw); /* 结束位置，向左下方移动 */
  }
}

/* 第二个背景渐变球的浮动动画 */
@keyframes float-2 {
  0% {
    transform: translate(0, 0); /* 起始位置 */
  }
  100% {
    transform: translate(8vw, -8vw); /* 结束位置，向右上方移动 */
  }
}

/* 第三个背景渐变球的浮动动画 */
@keyframes float-3 {
  0% {
    transform: translate(0, 0); /* 起始位置 */
  }
  100% {
    transform: translate(-10vw, 10vw); /* 结束位置，向左下方移动更远 */
  }
}

/* 主容器布局 - Element Plus容器组件样式 */
.el-container {
  position: relative; /* 相对定位 */
  z-index: 1; /* 层级设置，确保在背景渐变层之上 */
}

/* 顶部标题栏 - Element Plus头部组件样式 */
.el-header {
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: space-between; /* 两端对齐 */
  height: 80px !important; /* 固定高度 */
  background: rgba(255, 255, 255, 0.95); /* 半透明白色背景 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08); /* 阴影效果 */
  position: sticky; /* 粘性定位，滚动时保持可见 */
  top: 0; /* 顶部对齐 */
  z-index: 100; /* 高层级，确保在其他内容上方 */
  backdrop-filter: blur(15px); /* 背景模糊效果，增强磨砂玻璃感 */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); /* 底部细边框 */
  padding: 0 25px; /* 左右内边距 */
}

/* 标题文本样式 */
.header-title {
  font-size: 2rem; /* 字体大小 */
  background: linear-gradient(to right, #f56c6c, #e6a23c); /* 渐变背景色 */
  -webkit-background-clip: text; /* 背景裁剪为文本形状 */
  -webkit-text-fill-color: transparent; /* 文本颜色透明，显示背景色 */
  background-clip: text; /* 标准属性，背景裁剪为文本 */
  margin: 0; /* 移除外边距 */
  font-weight: 800; /* 字体粗细 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  gap: 12px; /* 元素间距 */
  filter: drop-shadow(0 2px 3px rgba(245, 108, 108, 0.2)); /* 文字阴影效果 */
  letter-spacing: 1px; /* 字间距 */
  transition: all 0.3s ease; /* 过渡效果 */
}

/* 标题文本悬停效果 */
.header-title:hover {
  transform: scale(1.02); /* 轻微放大效果 */
  filter: drop-shadow(0 3px 5px rgba(245, 108, 108, 0.3)); /* 增强阴影效果 */
}

/* 标题图标样式 */
.header-icon {
  font-size: 28px; /* 图标大小 */
  color: #f56c6c; /* 图标颜色 */
  animation: pulse-star 2s infinite; /* 脉冲动画效果 */
  transform-origin: center; /* 变换原点居中 */
}

/* 标题图标脉冲动画 */
@keyframes pulse-star {
  0% {
    transform: scale(1); /* 初始大小 */
  }
  50% {
    transform: scale(1.15); /* 中间状态放大 */
  }
  100% {
    transform: scale(1); /* 恢复初始大小 */
  }
}

.clear-btn {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); /* 平滑过渡动画，带弹性效果 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  gap: 8px; /* 图标和文字间距 */
  border-radius: 8px; /* 圆角效果 */
  padding: 10px 16px; /* 内边距 */
  font-weight: 500; /* 字体粗细 */
  position: relative; /* 相对定位，用于光效效果 */
  overflow: hidden; /* 隐藏溢出内容 */
}

.clear-btn:hover:not(:disabled) {
  transform: translateY(-4px); /* 上浮效果 */
  box-shadow: 0 8px 15px rgba(245, 108, 108, 0.3); /* 阴影效果 */
}

.clear-btn::before {
  content: ''; /* 伪元素内容 */
  position: absolute; /* 绝对定位 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满 */
  height: 100%; /* 高度占满 */
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0) 100%); /* 闪光渐变效果 */
  transform: translateX(-100%); /* 默认位置在左侧外部 */
  transition: transform 0.6s ease; /* 位移过渡动画 */
}

.clear-btn:hover:not(:disabled)::before {
  transform: translateX(100%); /* 光效从左向右滑过 */
}

.el-main {
  padding: 30px; /* 内边距 */
}

.empty-container {
  margin-top: 40px; /* 顶部外边距 */
  animation: fade-in 1s ease-out; /* 淡入动画效果 */
  display: flex; /* 弹性布局 */
  flex-direction: column; /* 纵向排列 */
  align-items: center; /* 水平居中 */
  text-align: center; /* 文本居中 */
  max-width: 500px; /* 最大宽度 */
  margin: 60px auto; /* 上下边距60px，左右自动居中 */
}

@keyframes fade-in {
  from {
    opacity: 0; /* 初始透明 */
    transform: translateY(20px); /* 初始位置下移 */
  }
  to {
    opacity: 1; /* 最终完全不透明 */
    transform: translateY(0); /* 最终位置正常 */
  }
}

.empty-illustration {
  display: flex; /* 弹性布局 */
  flex-direction: column; /* 纵向排列 */
  align-items: center; /* 水平居中 */
}

.empty-icon {
  font-size: 64px; /* 图标大小 */
  color: #f56c6c; /* 图标颜色 */
  margin-bottom: 30px; /* 底部外边距 */
  animation: pulse-star-empty 2s ease-in-out infinite; /* 脉冲动画效果 */
  transform-origin: center; /* 变换原点居中 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  width: 100px; /* 宽度 */
  height: 100px; /* 高度 */
  background: linear-gradient(135deg, #f8f9fa, #ffffff); /* 渐变背景 */
  border-radius: 50%; /* 圆形边框 */
  box-shadow: 0 10px 30px rgba(245, 108, 108, 0.2); /* 阴影效果 */
}

@keyframes pulse-star-empty {
  0%, 100% {
    transform: scale(1); /* 初始和最终大小一致 */
  }
  50% {
    transform: scale(1.2); /* 中间状态放大 */
  }
}

/* 空状态手机图标容器 */
.empty-phones {
  display: flex; /* 弹性布局 */
  gap: 15px; /* 手机图标间距 */
  margin: 20px 0; /* 上下外边距 */
}

/* 基础手机图标样式 */
.empty-phone {
  width: 15px; /* 宽度 */
  height: 40px; /* 高度 */
  background-color: #f56c6c; /* 红色背景 */
  border-radius: 4px; /* 圆角效果 */
  position: relative; /* 相对定位 */
  animation-duration: 1.5s; /* 动画持续时间 */
  animation-timing-function: ease-in-out; /* 动画缓动函数 */
  animation-iteration-count: infinite; /* 无限循环 */
}

/* 第一个手机图标样式 */
.phone1 {
  animation-name: float-phone; /* 应用浮动动画 */
  animation-delay: 0s; /* 无延迟 */
}

/* 第二个手机图标样式 */
.phone2 {
  height: 50px; /* 高度稍大 */
  animation-name: float-phone; /* 应用浮动动画 */
  animation-delay: 0.3s; /* 延迟0.3秒 */
}

/* 第三个手机图标样式 */
.phone3 {
  height: 45px; /* 高度介于两者之间 */
  animation-name: float-phone; /* 应用浮动动画 */
  animation-delay: 0.6s; /* 延迟0.6秒 */
}

/* 手机图标浮动动画 */
@keyframes float-phone {
  0%, 100% {
    transform: translateY(0); /* 初始和最终位置一致 */
  }
  50% {
    transform: translateY(-10px); /* 中间状态上浮 */
  }
}

/* 空状态标题样式 */
.empty-title {
  color: #303133; /* 文字颜色 */
  font-size: 24px; /* 字体大小 */
  font-weight: 700; /* 字体粗细 */
  margin-bottom: 10px; /* 底部外边距 */
  background: linear-gradient(to right, #f56c6c, #e6a23c); /* 渐变背景 */
  -webkit-background-clip: text; /* 背景裁剪为文本形状 */
  -webkit-text-fill-color: transparent; /* 文本颜色透明，显示背景色 */
  background-clip: text; /* 标准属性，背景裁剪为文本 */
  filter: drop-shadow(0 2px 2px rgba(245, 108, 108, 0.1)); /* 文字阴影效果 */
}

/* 空状态描述文字样式 */
.empty-description {
  color: #606266; /* 文字颜色 */
  font-size: 16px; /* 字体大小 */
  margin: 15px 0 30px; /* 外边距，上15px，下30px */
  max-width: 300px; /* 最大宽度 */
  line-height: 1.6; /* 行高 */
}

/* 添加手机按钮样式 */
.add-phone-btn {
  padding: 14px 28px !important; /* 内边距 */
  font-size: 16px !important; /* 字体大小 */
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; /* 过渡动画 */
  display: flex !important; /* 弹性布局 */
  align-items: center !important; /* 垂直居中 */
  justify-content: center !important; /* 水平居中 */
  gap: 10px !important; /* 图标和文字间距 */
  border-radius: 10px !important; /* 圆角效果 */
  background: linear-gradient(135deg, #409EFF, #337ecc) !important; /* 渐变背景 */
  border: none !important; /* 无边框 */
  position: relative !important; /* 相对定位 */
  overflow: hidden !important; /* 隐藏溢出内容 */
  box-shadow: 0 8px 15px rgba(64, 158, 255, 0.3) !important; /* 阴影效果 */
}

/* 添加手机按钮悬停效果 */
.add-phone-btn:hover {
  transform: translateY(-5px) !important; /* 上浮效果 */
  box-shadow: 0 15px 25px rgba(64, 158, 255, 0.4) !important; /* 增强阴影效果 */
}

/* 添加手机按钮光效 */
.add-phone-btn::before {
  content: ''; /* 伪元素内容 */
  position: absolute; /* 绝对定位 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满 */
  height: 100%; /* 高度占满 */
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%); /* 闪光渐变效果 */
  transform: translateX(-100%); /* 默认位置在左侧外部 */
  transition: transform 0.6s ease; /* 位移过渡动画 */
}

/* 添加手机按钮悬停时光效动画 */
.add-phone-btn:hover::before {
  transform: translateX(100%); /* 光效从左向右滑过 */
}

/* 收藏内容容器 - 有收藏项目时显示 */
.favorite-container {
  background: rgba(255, 255, 255, 0.92); /* 半透明白色背景 */
  border-radius: 20px; /* 圆角效果 */
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  overflow: hidden; /* 隐藏溢出内容 */
  backdrop-filter: blur(15px); /* 背景模糊效果 */
  animation: slide-up 0.8s ease-out; /* 滑入动画效果 */
  border: 1px solid rgba(255, 255, 255, 0.5); /* 浅色边框 */
  padding: 25px; /* 内边距 */
}

/* 收藏容器滑入动画 */
@keyframes slide-up {
  from {
    opacity: 0; /* 初始透明 */
    transform: translateY(50px); /* 初始位置下移 */
  }
  to {
    opacity: 1; /* 最终不透明 */
    transform: translateY(0); /* 最终位置正常 */
  }
}

/* 收藏列表标题栏 */
.favorite-header {
  display: flex; /* 弹性布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中 */
  padding: 0 10px 20px; /* 内边距，左右10px，底部20px */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); /* 底部细边框 */
  margin-bottom: 10px; /* 底部外边距 */
}

/* 收藏列表标题文本 */
.favorite-title {
  margin: 0; /* 移除外边距 */
  color: #303133; /* 文字颜色 */
  font-size: 20px; /* 字体大小 */
  font-weight: 700; /* 字体粗细 */
  position: relative; /* 相对定位，用于下划线效果 */
  display: inline-block; /* 内联块显示 */
}

/* 收藏列表标题下划线效果 */
.favorite-title::after {
  content: ''; /* 伪元素内容 */
  position: absolute; /* 绝对定位 */
  bottom: -5px; /* 底部间距 */
  left: 0; /* 左侧对齐 */
  width: 40px; /* 初始宽度 */
  height: 3px; /* 高度 */
  background: linear-gradient(to right, #f56c6c, #e6a23c); /* 渐变背景 */
  border-radius: 2px; /* 圆角效果 */
  transition: width 0.3s ease; /* 宽度过渡动画 */
}

/* 收藏列表标题悬停时下划线效果 */
.favorite-title:hover::after {
  width: 100%; /* 宽度扩展到100% */
}

/* 收藏排序区域 */
.favorite-sort {
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 元素间距 */
}

/* 排序按钮样式 */
.sort-btn {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); /* 平滑过渡动画 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  border-radius: 50%; /* 圆形按钮 */
  width: 40px; /* 宽度 */
  height: 40px; /* 高度 */
  background: linear-gradient(120deg, #f56c6c, #e6a23c); /* 渐变背景 */
  color: white; /* 白色文字 */
}

/* 排序按钮悬停效果 */
.sort-btn:hover {
  transform: translateY(-4px); /* 上浮效果 */
  box-shadow: 0 8px 15px rgba(245, 108, 108, 0.3); /* 阴影效果 */
}

/* 手机卡片网格布局 */
.phone-grid {
  display: grid; /* 网格布局 */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* 自适应列数和宽度 */
  gap: 25px; /* 网格间距 */
  margin-top: 20px; /* 顶部外边距 */
}

/* 手机卡片样式 */
.phone-card {
  border-radius: 16px; /* 圆角效果 */
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* 平滑过渡动画，带弹性效果 */
  border: none; /* 无边框 */
  overflow: hidden; /* 隐藏溢出内容 */
  background: transparent; /* 透明背景 */
  perspective: 1200px; /* 3D透视效果 */
  transform: translateZ(0); /* 启用硬件加速 */
}

/* 手机卡片内部容器 */
.phone-card-inner {
  background: white; /* 白色背景 */
  border-radius: 16px; /* 圆角效果 */
  padding: 18px; /* 内边距 */
  height: 100%; /* 高度占满父容器 */
  display: flex; /* 弹性布局 */
  flex-direction: column; /* 纵向排列 */
  transition: all 0.4s ease; /* 过渡动画 */
  transform-style: preserve-3d; /* 保持3D变换风格 */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07); /* 阴影效果 */
  border: 1px solid rgba(0, 0, 0, 0.03); /* 浅色边框 */
}

/* 手机卡片悬停效果 */
.phone-card:hover {
  transform: translateY(-12px) scale(1.03); /* 上浮并轻微放大 */
  z-index: 10; /* 提高层级，避免被其他卡片覆盖 */
}

/* 手机卡片悬停时内部容器效果 */
.phone-card:hover .phone-card-inner {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); /* 加深阴影效果 */
}

/* 手机图片容器 */
.phone-image-container {
  position: relative; /* 相对定位 */
  overflow: hidden; /* 隐藏溢出内容 */
  border-radius: 12px; /* 圆角效果 */
  background: linear-gradient(145deg, #f0f2f5, #ffffff); /* 渐变背景 */
  height: 220px; /* 固定高度 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.05); /* 内阴影效果 */
}

/* 手机图片样式 */
.phone-image {
  width: 85%; /* 宽度为容器的85% */
  height: 85%; /* 高度为容器的85% */
  object-fit: contain; /* 保持图片比例，完整显示 */
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); /* 平滑过渡动画 */
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1)); /* 图片阴影效果 */
}

/* 手机卡片悬停时图片效果 */
.phone-card:hover .phone-image {
  transform: scale(1.12) translateY(-8px); /* 放大并上移 */
  filter: drop-shadow(0 15px 20px rgba(0, 0, 0, 0.2)); /* 增强阴影效果 */
}

/* 操作按钮浮层 - 悬停时显示的操作区域 */
.actions-overlay {
  position: absolute; /* 绝对定位 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  right: 0; /* 右侧对齐 */
  bottom: 0; /* 底部对齐 */
  background: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  opacity: 0; /* 默认透明，不可见 */
  transition: all 0.3s ease; /* 过渡动画 */
  border-radius: 8px; /* 圆角效果 */
}

/* 手机卡片悬停时显示操作浮层 */
.phone-card:hover .actions-overlay {
  opacity: 1; /* 完全不透明，可见 */
}

/* 操作按钮容器 */
.action-buttons {
  display: flex; /* 弹性布局 */
  gap: 10px; /* 按钮间距 */
}

/* 移除收藏按钮样式 */
.remove-btn {
  transform: scale(0.8); /* 初始缩小 */
  transition: all 0.3s ease; /* 过渡动画 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

/* 移除收藏按钮悬停效果 */
.remove-btn:hover {
  transform: scale(1); /* 恢复原始大小 */
}

/* 查看详情按钮样式 */
.view-btn {
  transform: scale(0.8); /* 初始缩小 */
  transition: all 0.3s ease; /* 过渡动画 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

/* 查看详情按钮悬停效果 */
.view-btn:hover {
  transform: scale(1); /* 恢复原始大小 */
}

/* 手机标题样式 */
.phone-title {
  margin: 18px 0 10px; /* 外边距 */
  font-size: 17px; /* 字体大小 */
  color: #303133; /* 字体颜色 */
  font-weight: 600; /* 字体粗细 */
  height: 44px; /* 固定高度 */
  display: -webkit-box; /* 特殊显示方式，用于多行文本截断 */
  -webkit-line-clamp: 2; /* 最多显示2行 */
  -webkit-box-orient: vertical; /* 垂直方向 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 文本溢出显示省略号 */
  transition: color 0.3s ease; /* 颜色过渡动画 */
}

/* 手机卡片悬停时标题文字颜色变化 */
.phone-card:hover .phone-title {
  color: #f56c6c; /* 变为红色 */
}

/* 手机基本信息区域 */
.phone-info {
  display: flex; /* 弹性布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中 */
  margin: 10px 0; /* 上下外边距 */
}

/* 品牌标签样式 */
.brand-badge {
  padding: 4px 8px; /* 内边距 */
  border-radius: 6px; /* 圆角效果 */
}

/* 价格标签样式 */
.price {
  color: #f56c6c; /* 价格红色 */
  font-size: 18px; /* 字体大小 */
  font-weight: 700; /* 粗体 */
}

/* 手机规格展示区域 */
.phone-specs {
  display: flex; /* 弹性布局 */
  justify-content: space-around; /* 均匀分布 */
  margin: 12px 0; /* 上下外边距 */
  padding: 12px; /* 内边距 */
  background: linear-gradient(145deg, #f7faff, #e6f7ff); /* 渐变背景 */
  border-radius: 10px; /* 圆角效果 */
  box-shadow: inset 0 0 5px rgba(64, 158, 255, 0.1); /* 内阴影效果 */
  transition: all 0.3s ease; /* 过渡动画 */
}

/* 手机卡片悬停时规格区域效果 */
.phone-card:hover .phone-specs {
  box-shadow: inset 0 0 8px rgba(64, 158, 255, 0.2); /* 内阴影加深 */
}

/* 规格项样式 */
.spec-item {
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  gap: 6px; /* 元素间距 */
  color: #409EFF; /* 蓝色文字 */
  font-weight: 500; /* 字体粗细 */
}

/* 规格图标样式 */
.spec-icon {
  font-size: 16px; /* 图标大小 */
}

/* 手机评分展示区域 */
.phone-ratings {
  display: flex; /* 弹性布局 */
  flex-direction: column; /* 纵向排列 */
  gap: 8px; /* 项目间距 */
  margin: 15px 0; /* 上下外边距 */
  padding: 15px; /* 内边距 */
  background: linear-gradient(to right, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.01)); /* 渐变背景 */
  border-radius: 10px; /* 圆角效果 */
  transition: background 0.3s ease; /* 背景过渡动画 */
}

/* 手机卡片悬停时评分区域效果 */
.phone-card:hover .phone-ratings {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.02)); /* 背景加深 */
}

/* 评分项目样式 */
.rating-item {
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 两端对齐 */
}

/* 评分标签样式 */
.rating-label {
  color: #606266; /* 文字颜色 */
  font-size: 14px; /* 字体大小 */
  width: 40px; /* 固定宽度 */
  font-weight: 500; /* 字体粗细 */
}

/* 自定义评分组件样式 */
.custom-rate {
  --el-rate-icon-size: 18px; /* 自定义评分图标大小 */
}

/* 查看详情按钮 */
.detail-btn {
  width: 100%; /* 宽度占满 */
  margin-top: auto; /* 顶部外边距自动，推到底部 */
  border-radius: 10px; /* 圆角效果 */
  padding: 12px 20px; /* 内边距 */
  font-weight: 600; /* 字体粗细 */
  letter-spacing: 0.5px; /* 字符间距 */
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); /* 过渡动画 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  gap: 8px; /* 元素间距 */
  position: relative; /* 相对定位，用于光效效果 */
  overflow: hidden; /* 隐藏溢出内容 */
  border: none !important; /* 无边框 */
  background: linear-gradient(to right, #409EFF, #337ecc) !important; /* 渐变背景 */
  color: white !important; /* 白色文字 */
}

/* 详情按钮悬停效果 */
.detail-btn:hover {
  transform: translateY(-4px) !important; /* 上浮效果 */
  box-shadow: 0 8px 20px rgba(64, 158, 255, 0.4) !important; /* 阴影效果 */
}

/* 详情按钮光效 */
.detail-btn::before {
  content: ''; /* 伪元素内容 */
  position: absolute; /* 绝对定位 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满 */
  height: 100%; /* 高度占满 */
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%); /* 闪光渐变效果 */
  transform: translateX(-100%); /* 默认位置在左侧外部 */
  transition: transform 0.6s ease; /* 位移过渡动画 */
}

/* 详情按钮悬停时光效动画 */
.detail-btn:hover::before {
  transform: translateX(100%); /* 光效从左向右滑过 */
}

/* 响应式布局 - 大屏幕调整 */
@media (max-width: 1200px) {
  .phone-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); /* 减小卡片宽度 */
  }
}

/* 响应式布局 - 平板设备调整 */
@media (max-width: 768px) {
  .favorite-view {
    padding: 0; /* 移除内边距 */
  }
  
  .el-main {
    padding: 20px 15px; /* 减小内边距 */
  }
  
  .el-header {
    padding: 0 15px; /* 减小内边距 */
    height: auto !important; /* 自动高度 */
    min-height: 70px; /* 最小高度 */
    flex-wrap: wrap; /* 允许换行 */
  }
  
  .header-title {
    font-size: 1.5rem; /* 减小字体大小 */
    margin: 10px 0; /* 上下外边距 */
  }
  
  .clear-btn {
    margin: 10px 0; /* 上下外边距 */
  }
  
  .phone-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 进一步减小卡片宽度 */
    gap: 15px; /* 减小间距 */
  }
  
  .phone-image-container {
    height: 180px; /* 减小图片容器高度 */
  }
}

/* 响应式布局 - 手机设备调整 */
@media (max-width: 576px) {
  .el-main {
    padding: 15px 10px; /* 进一步减小内边距 */
  }
  
  .phone-grid {
    grid-template-columns: 1fr; /* 单列布局 */
  }
  
  .phone-title {
    font-size: 14px; /* 减小标题字体 */
  }
  
  .favorite-header {
    padding: 0 0 15px; /* 减小内边距 */
  }
}

/* 淡入缩放过渡效果 - 用于容器显示/隐藏 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* 平滑过渡动画 */
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0; /* 透明度变化 */
  transform: scale(0.95); /* 缩放效果 */
}

/* 列表项动画 - 用于手机卡片的添加/移除 */
.phone-list-enter-active,
.phone-list-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* 平滑过渡动画 */
}

.phone-list-enter-from {
  opacity: 0; /* 初始透明 */
  transform: translateY(30px); /* 初始位置下移 */
}

.phone-list-leave-to {
  opacity: 0; /* 最终透明 */
  transform: translateY(-30px); /* 最终位置上移 */
}

/* 列表项移动动画 - 用于排序变化 */
.phone-list-move {
  transition: transform 0.5s; /* 平滑过渡动画 */
}
</style> 