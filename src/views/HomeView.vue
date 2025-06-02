<template>
  <div class="home-view">
    <div class="home-container">
      <!-- 标题部分 -->
      <div 
        class="content-header fade-up" 
        :class="{ 'animated': animationReady, 'visible': animatedElements.title }">
        <h1 class="title">智能手机推荐系统</h1>
        <p class="subtitle">找到您的理想手机</p>
      </div>
      
      <!-- 手机模型 -->
      <div 
        class="phone-wrapper fade-up" 
        :class="{ 'animated': animationReady, 'visible': animatedElements.phone }">
        <div class="phone-model iphone-16-pro" @mousemove="handleMouseMove" @mouseleave="resetPhonePosition">
          <div class="dynamic-island">
            <div class="dynamic-island-content">
              <div class="island-pill"></div>
              <div class="island-camera"></div>
            </div>
          </div>
          <div class="screen">
            <div class="status-bar">
              <div class="time">{{ currentTime }}</div>
              <div class="indicators">
                <span class="signal"></span>
                <span class="wifi"></span>
                <span class="battery"></span>
              </div>
            </div>
            <div class="app-grid">
              <div class="app app-photos" @click="animateApp">
                <div class="app-icon-content photos-icon"></div>
                <span class="app-label">照片</span>
              </div>
              <div class="app app-camera" @click="animateApp">
                <div class="app-icon-content camera-icon"></div>
                <span class="app-label">相机</span>
              </div>
              <div class="app app-calendar" @click="animateApp">
                <div class="app-icon-content calendar-icon"></div>
                <span class="app-label">日历</span>
              </div>
              <div class="app app-maps" @click="animateApp">
                <div class="app-icon-content maps-icon"></div>
                <span class="app-label">地图</span>
              </div>
              <div class="app app-messages" @click="animateApp">
                <div class="app-icon-content messages-icon"></div>
                <span class="app-label">信息</span>
              </div>
              <div class="app app-mail" @click="animateApp">
                <div class="app-icon-content mail-icon"></div>
                <span class="app-label">邮件</span>
              </div>
              <div class="app app-safari" @click="animateApp">
                <div class="app-icon-content safari-icon"></div>
                <span class="app-label">Safari</span>
              </div>
              <div class="app app-music" @click="animateApp">
                <div class="app-icon-content music-icon"></div>
                <span class="app-label">音乐</span>
              </div>
              <div class="app app-store" @click="animateApp">
                <div class="app-icon-content appstore-icon"></div>
                <span class="app-label">App Store</span>
              </div>
              <div class="app app-settings" @click="animateApp">
                <div class="app-icon-content settings-icon"></div>
                <span class="app-label">设置</span>
              </div>
              <div class="app app-notes" @click="animateApp">
                <div class="app-icon-content notes-icon"></div>
                <span class="app-label">备忘录</span>
              </div>
              <div class="app app-health" @click="animateApp">
                <div class="app-icon-content health-icon"></div>
                <span class="app-label">健康</span>
              </div>
            </div>
            <div class="dock">
              <div class="dock-app dock-phone" @click="animateApp">
                <div class="app-icon-content phone-icon"></div>
              </div>
              <div class="dock-app dock-messages" @click="animateApp">
                <div class="app-icon-content messages-icon"></div>
              </div>
              <div class="dock-app dock-safari" @click="animateApp">
                <div class="app-icon-content safari-icon"></div>
              </div>
              <div class="dock-app dock-music" @click="animateApp">
                <div class="app-icon-content music-icon"></div>
              </div>
            </div>
          </div>
          <div class="side-buttons">
            <div class="volume-up"></div>
            <div class="volume-down"></div>
            <div class="action-button"></div>
            <div class="power-button"></div>
          </div>
          <div class="phone-reflection"></div>
        </div>
      </div>
      
      <!-- 功能特性 -->
      <div 
        class="features-showcase fade-up" 
        :class="{ 'animated': animationReady, 'visible': animatedElements.features }">
        <div class="feature-card">
          <div class="feature-icon">
            <el-icon :size="40"><Histogram /></el-icon>
          </div>
          <div class="feature-text">
            <h3>智能匹配</h3>
            <p>基于您的偏好与使用场景，精准匹配最适合的手机型号</p>
          </div>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <el-icon :size="40"><DataAnalysis /></el-icon>
          </div>
          <div class="feature-text">
            <h3>多维对比</h3>
            <p>对比不同机型的参数，从性能、相机、电池等多个维度进行分析</p>
          </div>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <el-icon :size="40"><Refresh /></el-icon>
          </div>
          <div class="feature-text">
            <h3>实时更新</h3>
            <p>手机数据库定期更新，确保信息准确性和时效性</p>
          </div>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <el-icon :size="40"><ChatSquare /></el-icon>
          </div>
          <div class="feature-text">
            <h3>用户评测</h3>
            <p>汇集真实用户的使用体验与评价，为您提供最真实的购机参考</p>
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div 
        class="action-container fade-up" 
        :class="{ 'animated': animationReady, 'visible': animatedElements.actions }">
        <div class="quick-links" :class="{ 'visible': animatedElements.actions }">
          <el-button class="action-btn primary-action" type="primary" size="large" @click="$router.push('/recommend')">
            <el-icon><Search /></el-icon>
            开始推荐
          </el-button>
          
          <el-button class="action-btn secondary-action" @click="$router.push('/compare')">
            <el-icon><Operation /></el-icon>
            对比手机
          </el-button>
          
          <el-button class="action-btn secondary-action" @click="$router.push('/detail/1')">
            <el-icon><View /></el-icon>
            浏览热门
          </el-button>
          
          <el-button class="action-btn secondary-action" @click="replayAnimation">
            <el-icon><RefreshRight /></el-icon>
            重播动画
          </el-button>
        </div>
      </div>
      
      <!-- 统计数据 -->
      <div 
        class="stats-showcase fade-up" 
        :class="{ 'animated': animationReady, 'visible': animatedElements.stats }">
        <div class="stat-item">
          <div class="stat-number">30+</div>
          <div class="stat-label">品牌覆盖</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">500+</div>
          <div class="stat-label">手机型号</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">99%</div>
          <div class="stat-label">推荐满意度</div>
        </div>
      </div>
      
      <!-- 热门机型 -->
      <div 
        class="trending-phones fade-up" 
        :class="{ 'animated': animationReady, 'visible': animatedElements.trending }">
        <h3 class="section-title">热门机型</h3>
        <div class="phone-tags">
          <div class="phone-tag">
            <div class="tag-icon">📱</div>
            <span>iPhone 16 Pro</span>
          </div>
          <div class="phone-tag">
            <div class="tag-icon">📱</div>
            <span>三星 Galaxy S24</span>
          </div>
          <div class="phone-tag">
            <div class="tag-icon">📱</div>
            <span>华为 Mate 60 Pro</span>
          </div>
          <div class="phone-tag">
            <div class="tag-icon">📱</div>
            <span>小米 14 Ultra</span>
          </div>
          <div class="phone-tag">
            <div class="tag-icon">📱</div>
            <span>OPPO Find X7</span>
          </div>
        </div>
      </div>
      
      <!-- 用户指南部分 -->
      <div 
        class="user-guide-section fade-up"
        :class="{ 'animated': animationReady, 'visible': animatedElements.userGuide }">
        <h3 class="section-title">使用指南</h3>
        <div class="guide-steps">
          <div class="guide-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>填写偏好</h4>
              <p>告诉我们您的使用习惯、预算范围和关注点</p>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>智能匹配</h4>
              <p>系统分析数据库中500+款手机，找出最适合您的型号</p>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>详细对比</h4>
              <p>查看推荐机型的详细参数对比和性能评分</p>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>做出选择</h4>
              <p>根据推荐结果和用户评价，做出最适合自己的选择</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 手机百科部分 -->
      <div 
        class="phone-encyclopedia fade-up"
        :class="{ 'animated': animationReady, 'visible': animatedElements.encyclopedia }">
        <h3 class="section-title">手机百科</h3>
        <div class="encyclopedia-content">
          <div class="encyclopedia-card">
            <div class="encyclopedia-icon">📱</div>
            <h4>处理器知识</h4>
            <ul class="encyclopedia-list">
              <li>骁龙8 Gen 3解析</li>
              <li>A17 Pro芯片性能</li>
              <li>天玑9300优势</li>
            </ul>
          </div>
          <div class="encyclopedia-card">
            <div class="encyclopedia-icon">📸</div>
            <h4>相机技术</h4>
            <ul class="encyclopedia-list">
              <li>计算摄影原理</li>
              <li>大底传感器优势</li>
              <li>潜望式镜头进化</li>
            </ul>
          </div>
          <div class="encyclopedia-card">
            <div class="encyclopedia-icon">🔋</div>
            <h4>电池技术</h4>
            <ul class="encyclopedia-list">
              <li>硅碳负极技术</li>
              <li>100W快充原理</li>
              <li>无线充电标准</li>
            </ul>
          </div>
          <div class="encyclopedia-card">
            <div class="encyclopedia-icon">🔒</div>
            <h4>安全知识</h4>
            <ul class="encyclopedia-list">
              <li>3D人脸识别</li>
              <li>屏下指纹技术</li>
              <li>安全芯片对比</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- 评测专区 -->
      <div 
        class="review-section fade-up"
        :class="{ 'animated': animationReady, 'visible': animatedElements.reviews }">
        <h3 class="section-title">评测专区</h3>
        <div class="review-cards">
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">JD</div>
              <div class="review-info">
                <div class="review-name">张先生</div>
                <div class="review-stars">★★★★★</div>
              </div>
            </div>
            <div class="review-content">
              <p>选择的iPhone 16 Pro完全符合我的预期，推荐系统给出的建议非常准确。续航提升明显，相机系统出色。</p>
            </div>
            <div class="review-phone-tag">iPhone 16 Pro</div>
          </div>
          
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">WL</div>
              <div class="review-info">
                <div class="review-name">王女士</div>
                <div class="review-stars">★★★★☆</div>
              </div>
            </div>
            <div class="review-content">
              <p>按照系统推荐购买了小米14 Ultra，相机表现超出预期，唯一不足是有点重，但整体非常满意。</p>
            </div>
            <div class="review-phone-tag">小米 14 Ultra</div>
          </div>
          
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">LB</div>
              <div class="review-info">
                <div class="review-name">李先生</div>
                <div class="review-stars">★★★★★</div>
              </div>
            </div>
            <div class="review-content">
              <p>系统推荐了华为Mate 60 Pro，国产系统的进步令人惊讶，性能流畅，信号稳定，拍照也很出色。</p>
            </div>
            <div class="review-phone-tag">华为 Mate 60 Pro</div>
          </div>
        </div>
      </div>
      
    </div>
    
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ArrowRight, Histogram, DataAnalysis, Refresh, Search, Operation, View, ChatSquare, RefreshRight } from '@element-plus/icons-vue'

// 当前时间
const currentTime = ref('12:30')
let timeInterval = null

// 更新时间
const updateTime = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
}

// 3D手机位置效果 - 优化性能
let requestAnimationId = null
const phonePosition = ref({ rotateX: 0, rotateY: 0 })

const handleMouseMove = (e) => {
  const phoneEl = e.currentTarget
  const rect = phoneEl.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  // 计算旋转角度
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const targetRotateY = ((x - centerX) / centerX) * 5
  const targetRotateX = ((centerY - y) / centerY) * 5
  
  // 平滑动画效果
  phonePosition.value = {
    rotateX: targetRotateX,
    rotateY: targetRotateY
  }
  
  if (!requestAnimationId) {
    requestAnimationId = requestAnimationFrame(updatePhoneTransform)
  }
}

const updatePhoneTransform = () => {
  const phoneEl = document.querySelector('.phone-model')
  if (phoneEl) {
    phoneEl.style.transform = `perspective(2000px) rotateY(${phonePosition.value.rotateY}deg) rotateX(${phonePosition.value.rotateX}deg)`
  }
  requestAnimationId = null
}

const resetPhonePosition = () => {
  phonePosition.value = { rotateX: 0, rotateY: 0 }
  if (!requestAnimationId) {
    requestAnimationId = requestAnimationFrame(updatePhoneTransform)
  }
}

// 热门手机数据
const trendingPhones = ref([
  { name: 'iPhone 16 Pro', icon: '📱', color: '#42b983' },
  { name: '三星 Galaxy S24', icon: '📱', color: '#5d7df5' },
  { name: '华为 Mate 60 Pro', icon: '📱', color: '#f55d5d' },
  { name: '小米 14 Ultra', icon: '📱', color: '#f5a95d' },
  { name: 'OPPO Find X7', icon: '📱', color: '#8f5df5' }
])

// 应用图标动画
const animateApp = (e) => {
  const app = e.currentTarget
  app.classList.add('app-pressed')
  setTimeout(() => {
    app.classList.remove('app-pressed')
  }, 300)
}

// 是否为移动设备
const isMobile = computed(() => {
  return window.innerWidth <= 768
})

// 监听窗口大小变化
const handleResize = () => {
  // 重置请求动画帧以防止性能问题
  if (requestAnimationId) {
    cancelAnimationFrame(requestAnimationId)
    requestAnimationId = null
  }
}

// 动画相关状态
const animationReady = ref(true)
const isReplaying = ref(false)
const animatedElements = ref({
  title: false,
  phone: false,
  features: false,
  actions: false,
  stats: false,
  trending: false,
  userGuide: false,
  encyclopedia: false,
  reviews: false
})

// 滚动监听功能
const observerOptions = {
  root: null, // 使用视口作为根
  rootMargin: '0px 0px -10% 0px', // 当元素进入视口的底部10%时触发
  threshold: 0.1 // 当元素10%的部分可见时触发
}

// 创建观察者
let observers = []

// 设置滚动观察
const setupScrollObservers = () => {
  // 清除之前的观察者
  observers.forEach(observer => observer.disconnect())
  observers = []
  
  // 观察所有可动画元素
  const sections = [
    { selector: '.content-header', key: 'title' },
    { selector: '.phone-wrapper', key: 'phone' },
    { selector: '.features-showcase', key: 'features' },
    { selector: '.action-container', key: 'actions' },
    { selector: '.stats-showcase', key: 'stats' },
    { selector: '.trending-phones', key: 'trending' },
    { selector: '.user-guide-section', key: 'userGuide' },
    { selector: '.phone-encyclopedia', key: 'encyclopedia' },
    { selector: '.review-section', key: 'reviews' }
  ]
  
  sections.forEach(section => {
    const element = document.querySelector(section.selector)
    if (element) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (section.key === 'phone') {
              // 手机模型稍后显示
              setTimeout(() => {
                animatedElements.value[section.key] = true
              }, 500)
            } else {
              animatedElements.value[section.key] = true
            }
            observer.unobserve(entry.target) // 触发一次后不再观察
          }
        })
      }, observerOptions)
      
      observer.observe(element)
      observers.push(observer)
    }
  })
}

// 重播动画
const replayAnimation = () => {
  // 防止重复点击
  if (isReplaying.value) return
  
  isReplaying.value = true
  
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  // 将所有元素设为不可见
  Object.keys(animatedElements.value).forEach(key => {
    animatedElements.value[key] = false
  })
  
  // 短暂延迟后重新设置观察者
  setTimeout(() => {
    setupScrollObservers()
    isReplaying.value = false
    
    // 首先显示标题
    setTimeout(() => {
      animatedElements.value.title = true
    }, 300)
  }, 600)
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 60000) // 每分钟更新一次时间
  window.addEventListener('resize', handleResize)
  
  // 启动基于滚动的动画
  setupScrollObservers()
  
  // 首先显示标题
  setTimeout(() => {
    animatedElements.value.title = true
  }, 300)
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
  if (requestAnimationId) cancelAnimationFrame(requestAnimationId)
  window.removeEventListener('resize', handleResize)
  
  // 清除所有观察者
  observers.forEach(observer => observer.disconnect())
})
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  will-change: transform; /* 性能优化 */
}

.home-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px; /* 各部分之间的间距 */
  padding: 60px 20px;
}

/* 动画过渡效果 */
.fade-up {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0s;
  pointer-events: none;
  will-change: opacity, transform;
}

.fade-up.animated {
  transition: opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), 
              transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.fade-up.animated.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.bg-gradient-1,
.bg-gradient-2 {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  opacity: 0.5;
  will-change: transform; /* 性能优化 */
}

.bg-gradient-1 {
  background: radial-gradient(circle, rgba(66, 185, 131, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 50vw;
  height: 50vw;
  top: -10vw;
  right: -10vw;
  animation: float-1 15s ease-in-out infinite alternate;
}

.bg-gradient-2 {
  background: radial-gradient(circle, rgba(91, 143, 249, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 60vw;
  height: 60vw;
  bottom: -20vw;
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

.phone-wrapper {
  perspective: 1500px;
  transform-style: preserve-3d;
  position: relative;
  margin: 20px 0 40px;
}

.phone-wrapper::before {
  content: '';
  position: absolute;
  width: 250px;
  height: 40px;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%);
  border-radius: 50%;
  z-index: -1;
  filter: blur(10px);
}

.content-header {
  text-align: center;
  margin-bottom: 10px;
  position: relative;
}

.content-header::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #42b983, #2f9768);
  border-radius: 2px;
}

.title {
  font-size: 3rem;
  margin-bottom: 10px;
  background: linear-gradient(to right, #42b983, #2f9768);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.4rem;
  color: #555;
  font-weight: 300;
  margin: 0;
}

/* 功能展示区 - 改进视觉效果 */
.features-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
}

/* 为功能卡片添加延迟动画效果 */
.features-showcase.visible .feature-card:nth-child(1) {
  animation: feature-appear 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s forwards;
}

.features-showcase.visible .feature-card:nth-child(2) {
  animation: feature-appear 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s forwards;
}

.features-showcase.visible .feature-card:nth-child(3) {
  animation: feature-appear 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s forwards;
}

.features-showcase.visible .feature-card:nth-child(4) {
  animation: feature-appear 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s forwards;
}

@keyframes feature-appear {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  opacity: 0;
  transform: translateY(30px);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  border-left: 4px solid #42b983;
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b983 0%, #2f9768 100%);
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(66, 185, 131, 0.3);
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-text h3 {
  margin: 0 0 8px;
  font-size: 1.3rem;
  font-weight: 600;
  color: #303133;
}

.feature-text p {
  margin: 0;
  color: #606266;
  font-size: 1rem;
  line-height: 1.6;
}

/* 操作按钮区 - 增强交互性 */
.action-container {
  width: 100%;
  max-width: 900px;
}

.quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  justify-content: center;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  padding: 14px 25px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
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

.action-btn:hover::before {
  transform: translateX(100%);
}

.primary-action {
  font-size: 1.1rem;
  box-shadow: 0 10px 25px rgba(66, 185, 131, 0.25);
  flex: 2;
  min-width: 200px;
}

.primary-action:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 30px rgba(66, 185, 131, 0.4);
}

.secondary-action {
  flex: 1;
  min-width: 150px;
}

.secondary-action:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

/* 为重播按钮添加样式 */
.quick-links .action-btn:last-child {
  position: relative;
  overflow: hidden;
}

.quick-links .action-btn:last-child::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, 
    rgba(66, 185, 131, 0.1) 0%, 
    rgba(66, 185, 131, 0.2) 50%, 
    rgba(66, 185, 131, 0.1) 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.quick-links .action-btn:last-child:hover::after {
  transform: translateX(0);
}

.quick-links .action-btn:last-child .el-icon {
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.quick-links .action-btn:last-child:hover .el-icon {
  transform: rotate(180deg);
}

/* 数据统计区 - 增强视觉效果 */
.stats-showcase {
  display: flex;
  justify-content: space-around;
  padding: 25px;
  background: linear-gradient(135deg, rgba(66, 185, 131, 0.05), rgba(47, 151, 104, 0.15));
  border-radius: 20px;
  box-shadow: 
    inset 0 0 20px rgba(255, 255, 255, 0.8),
    0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 700px;
  backdrop-filter: blur(10px);
}

.stats-showcase::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  opacity: 0;
  animation: stats-pulse 5s ease-in-out infinite;
}

@keyframes stats-pulse {
  0%, 100% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.stat-item {
  text-align: center;
  position: relative;
  transition: transform 0.3s ease;
  opacity: 0;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(to right, #42b983, #2f9768);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 5px;
  position: relative;
  display: inline-block;
}

.stat-number::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 25%;
  width: 50%;
  height: 3px;
  background: linear-gradient(to right, transparent, #42b983, transparent);
  border-radius: 3px;
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.stat-item:hover .stat-number::after {
  opacity: 1;
  transform: scaleX(1);
}

.stat-label {
  font-size: 1rem;
  color: #606266;
  font-weight: 500;
}

/* 为统计数据添加动画效果 */
.stats-showcase.visible .stat-item:nth-child(1) {
  animation: stat-count-up 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s forwards;
}

.stats-showcase.visible .stat-item:nth-child(2) {
  animation: stat-count-up 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s forwards;
}

.stats-showcase.visible .stat-item:nth-child(3) {
  animation: stat-count-up 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s forwards;
}

@keyframes stat-count-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 热门机型标签 - 增强交互性 */
.trending-phones {
  width: 100%;
  max-width: 900px;
}

.section-title {
  font-size: 1.4rem;
  color: #303133;
  margin-bottom: 20px;
  position: relative;
  padding-left: 18px;
  display: inline-block;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 25px;
  background: #42b983;
  border-radius: 3px;
}

.phone-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.phone-tag {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 30px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  opacity: 0;
  backdrop-filter: blur(10px);
}

.phone-tag:hover {
  transform: translateY(-5px) rotate(1deg);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  background: white;
}

.phone-tag:nth-child(odd):hover {
  transform: translateY(-5px) rotate(-1deg);
}

.tag-icon {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.phone-tag:hover .tag-icon {
  transform: scale(1.2);
}

/* 为热门手机标签添加动画效果 */
.trending-phones.visible .phone-tag:nth-child(1) {
  animation: tag-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s forwards;
}

.trending-phones.visible .phone-tag:nth-child(2) {
  animation: tag-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s forwards;
}

.trending-phones.visible .phone-tag:nth-child(3) {
  animation: tag-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s forwards;
}

.trending-phones.visible .phone-tag:nth-child(4) {
  animation: tag-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s forwards;
}

.trending-phones.visible .phone-tag:nth-child(5) {
  animation: tag-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s forwards;
}

@keyframes tag-appear {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 为按钮添加延迟动画 */
.quick-links.visible {
  animation: buttons-appear 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes buttons-appear {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .features-showcase {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
  
  .action-btn {
    padding: 12px 20px;
  }
  
  .title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .home-view {
    padding: 10px;
  }
  
  .home-container {
    padding: 40px 15px;
    gap: 30px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .stats-showcase {
    flex-wrap: wrap;
    gap: 15px;
    padding: 20px;
  }
  
  .stat-item {
    flex: 0 0 calc(50% - 15px);
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .feature-card {
    padding: 15px;
  }
  
  .feature-icon {
    width: 55px;
    height: 55px;
  }
  
  .feature-text h3 {
    font-size: 1.1rem;
  }
  
  .feature-text p {
    font-size: 0.9rem;
  }
  
  .section-title {
    font-size: 1.2rem;
  }
  
  .phone-tag {
    padding: 8px 15px;
  }
}

/* 优化的iPhone模型动画性能 */
.phone-model {
  position: relative;
  width: 300px;
  height: 580px;
  background: linear-gradient(145deg, 
    #f0f0f0 0%, 
    #dadada 20%, 
    #c8c8c8 40%,
    #d5d5d5 60%, 
    #e8e8e8 80%,
    #f5f5f5 100%
  );
  border-radius: 50px;
  box-shadow:
    0 0 0 1px rgba(230, 230, 230, 0.4),
    0 35px 65px rgba(0, 0, 0, 0.3),
    0 20px 35px rgba(0, 0, 0, 0.2);
  z-index: 0;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: visible;
  cursor: pointer;
  will-change: transform; /* 性能优化 */
  animation: phone-float 3s ease-in-out infinite;
  animation-play-state: running;
}

.phone-model:hover {
  animation-play-state: paused;
}

@keyframes phone-float {
  0%, 100% {
    transform: perspective(2000px) translateY(0) rotateX(1deg) rotateY(-3deg) scale(1);
    box-shadow:
      0 0 0 1px rgba(230, 230, 230, 0.4),
      0 35px 65px rgba(0, 0, 0, 0.3),
      0 20px 35px rgba(0, 0, 0, 0.2);
  }
  50% {
    transform: perspective(2000px) translateY(-15px) rotateX(-1deg) rotateY(3deg) scale(1.02);
    box-shadow:
      0 0 0 1px rgba(230, 230, 230, 0.4),
      0 50px 80px rgba(0, 0, 0, 0.25),
      0 30px 45px rgba(0, 0, 0, 0.15);
  }
}

/* 银色边框 */
.iphone-16-pro {
  background: linear-gradient(145deg, 
    #e8e8e8 0%, 
    #d6d6d6 15%, 
    #c0c0c0 30%, 
    #b8b8b8 45%,
    #c5c5c5 60%, 
    #d8d8d8 75%,
    #e8e8e8 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
}

.iphone-16-pro::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.5) 15%,
    rgba(255, 255, 255, 0.2) 30%,
    rgba(255, 255, 255, 0.15) 45%,
    rgba(255, 255, 255, 0.2) 60%,
    rgba(255, 255, 255, 0.5) 75%,
    rgba(255, 255, 255, 0.95) 100%
  );
  border-radius: inherit;
  z-index: 2;
  pointer-events: none;
  opacity: 0.9;
  animation: metal-shine 4s linear infinite;
}

.iphone-16-pro::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  background-size: 100px 100px;
  opacity: 0.07;
  mix-blend-mode: overlay;
  pointer-events: none;
}

@keyframes metal-shine {
  0%, 100% {
    opacity: 0.9;
    background-position: 0% 0%;
  }
  50% {
    opacity: 0.7;
    background-position: 100% 100%;
  }
}

.phone-reflection {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.6) 15%,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: inherit;
  pointer-events: none;
  z-index: 5;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  animation: reflection-pulse 4s ease-in-out infinite;
}

@keyframes reflection-pulse {
  0%, 100% {
    opacity: 0.8;
    background-position: 0% 0%;
  }
  50% {
    opacity: 0.6;
    background-position: 100% 100%;
  }
}

/* 侧边按钮 */
.side-buttons {
  position: absolute;
  right: -2px;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 3;
}

.volume-up, .volume-down, .power-button {
  width: 3px;
  height: 30px;
  background: linear-gradient(to right, #777, #999);
  border-radius: 2px;
  box-shadow: 
    -1px 0 2px rgba(0, 0, 0, 0.5),
    inset 1px 0 1px rgba(255, 255, 255, 0.3);
}

.action-button {
  width: 3px;
  height: 35px;
  background: linear-gradient(to right, #777, #999);
  border-radius: 2px;
  margin-top: 40px;
  box-shadow: 
    -1px 0 2px rgba(0, 0, 0, 0.5),
    inset 1px 0 1px rgba(255, 255, 255, 0.3);
}

/* 底部扬声器 */
.phone-model::after {
  content: '';
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: #333;
  border-radius: 3px;
  z-index: 10;
  box-shadow: 
    inset 0 0 0 1px rgba(255, 255, 255, 0.3),
    0 0 2px rgba(0, 0, 0, 0.5);
}

/* 应用图标动画效果 */
.app-pressed {
  transform: scale(0.9);
  opacity: 0.7;
}

/* 动态岛 */
.dynamic-island {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 34px;
  background: #000;
  border-radius: 20px;
  z-index: 10;
  box-shadow: 
    0 0 5px rgba(0, 0, 0, 0.8),
    inset 0 0 2px rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.phone-model:hover .dynamic-island {
  transform: translateX(-50%) scale(1.05);
  box-shadow: 
    0 0 8px rgba(0, 0, 0, 0.8),
    inset 0 0 4px rgba(255, 255, 255, 0.2);
}

/* 屏幕 */
.screen {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: linear-gradient(125deg, #2C5364, #203A43, #0F2027);
  border-radius: 42px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 
    inset 0 0 15px rgba(0, 0, 0, 0.7),
    inset 0 0 3px rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  padding: 0;
}

/* 动态岛内容 */
.dynamic-island-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.island-pill {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 5px;
  background: rgba(60, 60, 60, 0.9);
  border-radius: 3px;
  opacity: 0.5;
}

.island-camera {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: #1a1a1a;
  border-radius: 50%;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.5),
    inset 0 0 2px rgba(255, 255, 255, 0.1),
    0 0 0 1px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}

/* 状态栏 */
.status-bar {
  height: 30px;
  display: flex;
  justify-content: space-between;
  padding: 38px 25px 0;
  color: white;
  font-size: 14px;
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.time {
  font-weight: 600;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.3);
  letter-spacing: 0.5px;
}

.indicators {
  display: flex;
  gap: 8px;
}

/* 应用网格 */
.app-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(3, 1fr);
  gap: 15px;
  padding: 25px 15px;
  position: relative;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  overflow: visible;
}

/* 应用图标 */
.app {
  border-radius: 25%;
  box-shadow: 
    0 6px 12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transform-style: preserve-3d;
  height: auto;
  aspect-ratio: 1/1;
  max-width: 100%;
  width: 100%;
  margin: 0;
}

.app::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.3) 0%, 
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%);
  border-radius: inherit;
  z-index: 2;
}

.app:hover {
  transform: scale(1.15) translateY(-8px) translateZ(20px) rotateX(10deg);
  box-shadow: 
    0 18px 35px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.15);
}

.app-icon-content {
  width: 65%;
  height: 65%;
  position: relative;
  z-index: 1;
  border-radius: 22%;
  margin-bottom: 4px;
  box-shadow: 
    0 3px 8px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.app-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  margin-top: 5px;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Dock底部栏 */
.dock {
  height: 85px;
  margin: 5px 16px 18px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 0 5px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  z-index: 2;
  box-sizing: border-box;
  padding: 0 10px;
}

/* Dock中的应用 */
.dock-app {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  transform-style: preserve-3d;
  transform: translateZ(0);
}

.dock-app:hover {
  transform: scale(1.25) translateY(-12px) translateZ(30px) rotateX(10deg);
  box-shadow: 
    0 20px 35px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.2);
}

/* 重新设计应用图标具体样式，添加更逼真的效果 */
.photos-icon {
  background: linear-gradient(145deg, #f45d5d, #e13a3a);
  position: relative;
  overflow: hidden;
}

.photos-icon::before {
  content: '';
  position: absolute;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  background: 
    radial-gradient(circle at 25% 25%, #ffeb3b 0%, #ffeb3b 12%, transparent 12.1%, transparent),
    radial-gradient(circle at 75% 25%, #4caf50 0%, #4caf50 12%, transparent 12.1%, transparent),
    radial-gradient(circle at 25% 75%, #03a9f4 0%, #03a9f4 12%, transparent 12.1%, transparent),
    radial-gradient(circle at 75% 75%, #9c27b0 0%, #9c27b0 12%, transparent 12.1%, transparent),
    linear-gradient(to bottom, transparent 0%, transparent 100%);
  border-radius: 20%;
}

.camera-icon {
  background: linear-gradient(145deg, #3d3d3d, #292929);
  position: relative;
  overflow: hidden;
}

.camera-icon::before {
  content: '';
  position: absolute;
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  background: linear-gradient(145deg, #555, #444);
  border-radius: 50%;
  box-shadow: 
    inset 0 0 0 2px rgba(0, 0, 0, 0.4),
    inset 0 0 10px rgba(0, 0, 0, 0.6),
    0 0 0 3px rgba(30, 30, 30, 0.8);
}

.camera-icon::after {
  content: '';
  position: absolute;
  width: 20%;
  height: 20%;
  top: 12%;
  right: 12%;
  background: linear-gradient(145deg, #ffa726, #ff9800);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(255, 152, 0, 0.6);
}

.calendar-icon {
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.calendar-icon::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 30%;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #ff3b30, #e62d20);
  border-radius: 12px 12px 0 0;
}

.calendar-icon::after {
  content: '';
  position: absolute;
  width: 70%;
  height: 50%;
  bottom: 15%;
  left: 15%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  content: attr(data-date);
}

.maps-icon {
  background: linear-gradient(145deg, #f8f8f8, #ececec);
  position: relative;
  overflow: hidden;
}

.maps-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(120deg, 
      rgba(76, 217, 100, 0.6) 0%, 
      rgba(156, 204, 101, 0.6) 30%,
      rgba(255, 235, 59, 0.6) 50%,
      rgba(255, 193, 7, 0.6) 70%,
      rgba(255, 87, 34, 0.6) 100%);
  mask-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6));
  -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6));
}

.maps-icon::after {
  content: '';
  position: absolute;
  width: 35%;
  height: 35%;
  top: 32%;
  left: 32%;
  background: #4285f4;
  border-radius: 50%;
  box-shadow: 
    0 0 0 3px rgba(255, 255, 255, 0.7),
    0 0 10px rgba(66, 133, 244, 0.8);
}

.messages-icon {
  background: linear-gradient(145deg, #30d158, #2cc156);
  position: relative;
  overflow: hidden;
}

.messages-icon::before {
  content: '';
  position: absolute;
  width: 70%;
  height: 55%;
  top: 22%;
  left: 15%;
  background: white;
  border-radius: 20px;
  box-shadow: 
    inset 0 -3px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.2);
}

.messages-icon::after {
  content: '';
  position: absolute;
  width: 30%;
  height: 30%;
  bottom: 18%;
  left: 20%;
  background: white;
  transform: rotate(45deg);
  border-radius: 2px;
  z-index: -1;
}

.mail-icon {
  background: linear-gradient(145deg, #1e88e5, #1976d2);
  position: relative;
  overflow: hidden;
}

.mail-icon::before {
  content: '';
  position: absolute;
  width: 80%;
  height: 50%;
  top: 25%;
  left: 10%;
  background: linear-gradient(to bottom, #fff 0%, #f8f8f8 100%);
  border-radius: 4px;
  transform: perspective(120px) rotateX(12deg);
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(0, 0, 0, 0.05);
}

.mail-icon::after {
  content: '';
  position: absolute;
  width: 80%;
  height: 20%;
  top: 25%;
  left: 10%;
  background: linear-gradient(to bottom, #1565c0 0%, #0d47a1 100%);
  border-radius: 4px 4px 0 0;
  transform: perspective(120px) rotateX(12deg);
}

.safari-icon {
  background: linear-gradient(145deg, #ffffff, #f6f6f6);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.safari-icon::before {
  content: '';
  position: absolute;
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
  background: 
    radial-gradient(circle at center, white 0%, white 35%, transparent 35.1%),
    conic-gradient(
      from 45deg,
      #ff3b30 0%,
      #ff9500 12.5%,
      #ffcc00 25%,
      #4cd964 37.5%,
      #5ac8fa 50%,
      #007aff 62.5%,
      #5856d6 75%,
      #ff2d55 87.5%,
      #ff3b30 100%
    );
  border-radius: 50%;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.safari-icon::after {
  content: '';
  position: absolute;
  width: 44%;
  height: 44%;
  top: 28%;
  left: 28%;
  background: 
    radial-gradient(circle at center, #007aff 0%, #007aff 10%, transparent 10.1%),
    radial-gradient(circle at center, transparent 0%, transparent 40%, #007aff 40.1%, #007aff 70%, transparent 70.1%);
  border-radius: 50%;
  transform: rotate(45deg);
}

.music-icon {
  background: linear-gradient(145deg, #fc3c44, #ed2c3a);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.music-icon::before {
  content: '';
  position: absolute;
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  background: 
    radial-gradient(circle at 70% 30%, white 0%, white 30%, transparent 30.1%),
    linear-gradient(to bottom, white, white);
  border-radius: 0 0 50% 50%;
  box-shadow: 
    2px 2px 5px rgba(0, 0, 0, 0.2),
    -2px 0 3px rgba(0, 0, 0, 0.1);
}

.music-icon::after {
  content: '';
  position: absolute;
  width: 15%;
  height: 35%;
  top: 20%;
  right: 30%;
  background: white;
  border-radius: 2px;
  box-shadow: 
    2px 2px 3px rgba(0, 0, 0, 0.2);
}

.appstore-icon {
  background: linear-gradient(145deg, #0571ff, #0b62ed);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.appstore-icon::before {
  content: '';
  position: absolute;
  width: 66%;
  height: 66%;
  top: 17%;
  left: 17%;
  background: white;
  -webkit-mask: 
    linear-gradient(45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),
    linear-gradient(-45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),
    linear-gradient(90deg, black 0%, black 100%);
  mask: 
    linear-gradient(45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),
    linear-gradient(-45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),
    linear-gradient(90deg, black 0%, black 100%);
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.1);
}

.settings-icon {
  background: linear-gradient(145deg, #ececec, #e0e0e0);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.settings-icon::before {
  content: '';
  position: absolute;
  width: 78%;
  height: 78%;
  top: 11%;
  left: 11%;
  background: linear-gradient(145deg, #8e8e93, #7a7a7f);
  -webkit-mask: 
    radial-gradient(circle at center, transparent 0%, transparent 25%, black 25.1%, black 37%, transparent 37.1%),
    repeating-conic-gradient(
      transparent 0deg,
      transparent 30deg,
      black 30.1deg,
      black 60deg
    );
  mask: 
    radial-gradient(circle at center, transparent 0%, transparent 25%, black 25.1%, black 37%, transparent 37.1%),
    repeating-conic-gradient(
      transparent 0deg,
      transparent 30deg,
      black 30.1deg,
      black 60deg
    );
  border-radius: 50%;
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.1),
    0 2px 5px rgba(0, 0, 0, 0.15);
}

.notes-icon {
  background: linear-gradient(145deg, #fffef8, #f8f6e8);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.notes-icon::before {
  content: '';
  position: absolute;
  width: 85%;
  height: 80%;
  top: 10%;
  left: 7.5%;
  background: 
    linear-gradient(to bottom, 
      transparent 0%, 
      transparent 19%, 
      #d1d1d1 19.1%, 
      #d1d1d1 19.5%, 
      transparent 19.6%,
      transparent 39%, 
      #d1d1d1 39.1%, 
      #d1d1d1 39.5%, 
      transparent 39.6%,
      transparent 59%, 
      #d1d1d1 59.1%, 
      #d1d1d1 59.5%, 
      transparent 59.6%,
      transparent 79%, 
      #d1d1d1 79.1%, 
      #d1d1d1 79.5%, 
      transparent 79.6%
    );
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
}

.notes-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 8%;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #f8e283, #f5d151);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.health-icon {
  background: linear-gradient(145deg, #ff2d55, #ff3b50);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.health-icon::before {
  content: '';
  position: absolute;
  width: 68%;
  height: 68%;
  top: 16%;
  left: 16%;
  background: white;
  -webkit-mask: linear-gradient(
    to bottom,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );
  mask: linear-gradient(
    to bottom,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.health-icon::after {
  content: '';
  position: absolute;
  width: 68%;
  height: 68%;
  top: 16%;
  left: 16%;
  background: white;
  -webkit-mask: linear-gradient(
    to right,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );
  mask: linear-gradient(
    to right,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );
}

.phone-icon {
  background: linear-gradient(145deg, #35c759, #30b24d);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.phone-icon::before {
  content: '';
  position: absolute;
  width: 65%;
  height: 65%;
  top: 17.5%;
  left: 17.5%;
  background: white;
  border-radius: 12%;
  -webkit-mask: 
    radial-gradient(circle at center, black 0%, black 75%, transparent 75.1%);
  mask: 
    radial-gradient(circle at center, black 0%, black 75%, transparent 75.1%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 添加信号状态样式 */
.signal {
  width: 18px;
  height: 12px;
  position: relative;
  overflow: hidden;
}

.signal::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  mask-image: linear-gradient(to right, 
    #000 0%, #000 70%, 
    #000 70%, #000 75%, transparent 75%,
    transparent 80%, #000 80%, #000 85%, transparent 85%);
  -webkit-mask-image: linear-gradient(to right, 
    #000 0%, #000 70%, 
    #000 70%, #000 75%, transparent 75%,
    transparent 80%, #000 80%, #000 85%, transparent 85%);
  animation: signal-pulse 2s ease-in-out infinite;
}

@keyframes signal-pulse {
  0%, 100% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.7;
  }
}

.wifi {
  width: 16px;
  height: 12px;
  position: relative;
  overflow: hidden;
}

.wifi::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  mask-image: radial-gradient(
    circle at bottom center,
    transparent 0%,
    transparent 40%,
    #000 40.1%,
    #000 60%,
    transparent 60.1%,
    transparent 70%,
    #000 70.1%,
    #000 80%,
    transparent 80.1%
  );
  -webkit-mask-image: radial-gradient(
    circle at bottom center,
    transparent 0%,
    transparent 40%,
    #000 40.1%,
    #000 60%,
    transparent 60.1%,
    transparent 70%,
    #000 70.1%,
    #000 80%,
    transparent 80.1%
  );
  transform: scale(1.5);
}

.battery {
  width: 22px;
  height: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.battery::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  bottom: 2px;
  width: 60%;
  background: rgba(80, 220, 100, 0.9);
  border-radius: 1px;
  box-shadow: 0 0 5px rgba(80, 220, 100, 0.5);
  animation: battery-pulse 5s ease-in-out infinite;
}

@keyframes battery-pulse {
  0%, 100% {
    width: 60%;
    background: rgba(80, 220, 100, 0.9);
  }
  30% {
    width: 40%;
    background: rgba(255, 204, 0, 0.9);
  }
  60% {
    width: 75%;
    background: rgba(80, 220, 100, 0.9);
  }
}

.battery::after {
  content: '';
  position: absolute;
  right: -3px;
  top: 3px;
  bottom: 3px;
  width: 2px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0 1px 1px 0;
}

/* 用户指南部分 */
.user-guide-section {
  width: 100%;
  max-width: 900px;
}

.guide-steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* 卡片基础样式 */
.guide-step, .encyclopedia-card, .review-card {
  flex: 0 0 calc(45% - 10px);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  display: flex;
}

.guide-step {
  aspect-ratio: 16/9; /* 使用16:9比例 */
  min-height: 180px;
  padding: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b983, #2f9768);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  box-shadow: 0 5px 15px rgba(66, 185, 131, 0.3);
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.guide-step:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid #42b983;
}

.step-number {
  font-size: 1.5rem;
  font-weight: 600;
  color: #303133;
  margin-bottom: 10px;
}

.step-content h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #303133;
  margin-bottom: 5px;
}

.step-content p {
  font-size: 1rem;
  color: #606266;
  line-height: 1.6;
}

/* 具体卡片特殊样式 */
.encyclopedia-card {
  aspect-ratio: 16/9; /* 使用16:9比例 */
  min-height: 180px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-left: 4px solid #42b983;
}

.encyclopedia-icon {
  font-size: 2rem;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #42b983, #2f9768);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  filter: drop-shadow(0 2px 4px rgba(66, 185, 131, 0.2));
}

.encyclopedia-list {
  list-style: none;
  padding-left: 10px;
  margin-top: 15px;
}

.encyclopedia-list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
}

.encyclopedia-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #42b983;
  font-size: 1.2rem;
  line-height: 1;
}

/* 调整评测专区布局 */
.review-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.review-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.review-card {
  aspect-ratio: 16/9; /* 使用16:9比例 */
  min-height: 180px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.review-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: #42b983;
  transform: rotate(45deg) translate(20px, -20px);
  z-index: 0;
  opacity: 0.8;
}

.review-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid #42b983;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.review-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b983, #2f9768);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 10px rgba(66, 185, 131, 0.3);
}

.review-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.review-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.review-stars {
  font-size: 1rem;
  color: #ffd700;
  text-shadow: 0 0 2px rgba(255, 215, 0, 0.5);
}

.review-phone-tag {
  display: inline-block;
  padding: 5px 12px;
  background: rgba(66, 185, 131, 0.1);
  border: 1px solid rgba(66, 185, 131, 0.3);
  border-radius: 20px;
  color: #42b983;
  font-weight: 500;
  margin-top: 10px;
  font-size: 0.9rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .guide-step, 
  .encyclopedia-card,
  .review-card {
    flex: 0 0 100%;
  }
  
  .guide-steps,
  .encyclopedia-content,
  .review-cards {
    gap: 15px;
  }
  
  .encyclopedia-icon {
    font-size: 1.8rem;
  }
  
  .review-avatar {
    width: 40px;
    height: 40px;
  }
  
  .home-container {
    gap: 30px;
  }
}

/* 添加部分通用样式 */
.user-guide-section, .phone-encyclopedia {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.user-guide-section .section-title, 
.phone-encyclopedia .section-title,
.review-section .section-title {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

/* 手机百科部分 */
.phone-encyclopedia {
  width: 100%;
  max-width: 900px;
}

.encyclopedia-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.encyclopedia-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid #42b983;
}
</style>