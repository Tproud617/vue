<template>
  <div class="home-view">
    <div class="home-container">
      <!-- 标题部分 -->
      <div 
        class="content-header fade-up" 
        :class="{ 'animated': animationReady, 'visible': animatedElements.title }">
        <h1 class="title">智能手机<span class="highlight-text">推荐系统</span></h1>
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
        <!-- 主要操作按钮单独一行 -->
        <div class="primary-action-wrapper">
          <el-button class="action-btn primary-action pulse-effect" type="primary" size="large" @click="$router.push('/recommend')">
                <el-icon><Search /></el-icon>
                开始推荐
            <el-icon class="arrow-icon"><ArrowRight /></el-icon>
            </el-button>
        </div>
              
        <!-- 辅助按钮放在第二行 -->
        <div class="quick-links" :class="{ 'visible': animatedElements.actions }">
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
      
      <!-- 用户指南部分 - 优化设计 -->
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
      
      <!-- 手机百科部分 - 优化设计 -->
      <div 
        class="phone-encyclopedia fade-up"
        :class="{ 'animated': animationReady, 'visible': animatedElements.encyclopedia }">
        <h3 class="section-title">手机百科</h3>
        <div class="encyclopedia-content">
          <div class="encyclopedia-card" @click="$router.push('/about')">
            <div class="encyclopedia-icon">📱</div>
            <h4>处理器知识</h4>
            <ul class="encyclopedia-list">
              <li>骁龙8 Gen 3性能对比</li>
              <li>A17 Pro与M系芯片分析</li>
              <li>移动处理器选购指南</li>
              <li>天玑9300发热控制解析</li>
            </ul>
            <div class="read-more">
              <span>了解更多</span>
              <el-icon><ArrowRight /></el-icon>
          </div>
          </div>
          <div class="encyclopedia-card" @click="$router.push('/about')">
            <div class="encyclopedia-icon">📸</div>
            <h4>相机技术</h4>
            <ul class="encyclopedia-list">
              <li>2024年旗舰手机相机横评</li>
              <li>计算摄影AI算法解析</li>
              <li>大底传感器的优与劣</li>
              <li>潜望式长焦镜头进化史</li>
            </ul>
            <div class="read-more">
              <span>了解更多</span>
              <el-icon><ArrowRight /></el-icon>
          </div>
          </div>
          <div class="encyclopedia-card" @click="$router.push('/about')">
            <div class="encyclopedia-icon">🔋</div>
            <h4>电池技术</h4>
            <ul class="encyclopedia-list">
              <li>硅碳负极电池技术详解</li>
              <li>100W+超快充安全性分析</li>
              <li>无线充电Qi2新标准</li>
              <li>电池容量与实际续航关系</li>
            </ul>
            <div class="read-more">
              <span>了解更多</span>
              <el-icon><ArrowRight /></el-icon>
          </div>
          </div>
          <div class="encyclopedia-card" @click="$router.push('/about')">
            <div class="encyclopedia-icon">🔒</div>
            <h4>安全知识</h4>
            <ul class="encyclopedia-list">
              <li>3D结构光人脸识别原理</li>
              <li>超声波与光学指纹对比</li>
              <li>安全芯片与隐私保护</li>
              <li>手机安全使用完全指南</li>
            </ul>
            <div class="read-more">
              <span>了解更多</span>
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 评测专区 - 优化设计，去除卡片框架，与其他模块风格一致 -->
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
              <div class="review-badge">摄影达人</div>
            </div>
            <div class="review-content">
              <p>选择的iPhone 16 Pro完全符合我的预期，推荐系统给出的建议非常准确。续航提升明显，相机系统出色，尤其是在暗光环境下的表现令人惊艳。</p>
            </div>
            <div class="review-metrics">
              <div class="metric">
                <span class="metric-label">相机体验</span>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: 95%"></div>
                </div>
                <span class="metric-value">9.5</span>
              </div>
              <div class="metric">
                <span class="metric-label">续航表现</span>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: 85%"></div>
                </div>
                <span class="metric-value">8.5</span>
              </div>
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
              <div class="review-badge">游戏玩家</div>
            </div>
            <div class="review-content">
              <p>按照系统推荐购买了小米14 Ultra，相机表现超出预期，徕卡合作的徕卡四摄系统拍摄质量极佳。唯一不足是有点重，但整体非常满意，尤其是快充体验。</p>
            </div>
            <div class="review-metrics">
              <div class="metric">
                <span class="metric-label">游戏性能</span>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: 98%"></div>
                </div>
                <span class="metric-value">9.8</span>
              </div>
              <div class="metric">
                <span class="metric-label">散热控制</span>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: 80%"></div>
                </div>
                <span class="metric-value">8.0</span>
              </div>
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
              <div class="review-badge">商务用户</div>
            </div>
            <div class="review-content">
              <p>系统推荐了华为Mate 60 Pro，国产系统的进步令人惊讶，HarmonyOS流畅度不输iOS，自研麒麟芯片性能优秀。鸿蒙生态日渐完善，应用体验丰富。</p>
            </div>
            <div class="review-metrics">
              <div class="metric">
                <span class="metric-label">系统流畅度</span>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: 92%"></div>
                </div>
                <span class="metric-value">9.2</span>
              </div>
              <div class="metric">
                <span class="metric-label">商务功能</span>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: 95%"></div>
                </div>
                <span class="metric-value">9.5</span>
              </div>
            </div>
            <div class="review-phone-tag">华为 Mate 60 Pro</div>
          </div>

          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">ZX</div>
              <div class="review-info">
                <div class="review-name">赵女士</div>
                <div class="review-stars">★★★★☆</div>
              </div>
              <div class="review-badge">AI达人</div>
            </div>
            <div class="review-content">
              <p>根据系统推荐选择了三星Galaxy S24 Ultra，AI功能非常强大，实时翻译和对话摘要特别实用。S Pen手写笔功能精准，屏幕显示效果极佳。相机系统的远摄能力令人印象深刻。</p>
            </div>
            <div class="review-metrics">
              <div class="metric">
                <span class="metric-label">AI功能</span>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: 98%"></div>
                </div>
                <span class="metric-value">9.8</span>
              </div>
              <div class="metric">
                <span class="metric-label">屏幕表现</span>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: 96%"></div>
                </div>
                <span class="metric-value">9.6</span>
              </div>
            </div>
            <div class="review-phone-tag">三星 Galaxy S24 Ultra</div>
          </div>

          <div class="review-card professional-review">
            <div class="review-header">
              <div class="review-avatar">TW</div>
              <div class="review-info">
                <div class="review-name">田评测师</div>
                <div class="review-stars">★★★★★</div>
              </div>
              <div class="review-badge pro-badge">专业评测</div>
            </div>
            <div class="review-content">
              <p>作为专业评测师，我对比测试了系统推荐的几款旗舰机型。从硬件规格、系统优化、相机表现、游戏性能到续航表现各个维度进行了详尽测试。结果显示，推荐系统的匹配度高达95%以上，准确捕捉用户需求并给出合理建议。</p>
            </div>
            <div class="review-metrics">
              <div class="metric">
                <span class="metric-label">推荐准确率</span>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: 95%"></div>
                </div>
                <span class="metric-value">9.5</span>
              </div>
              <div class="metric">
                <span class="metric-label">专业度评分</span>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: 97%"></div>
                </div>
                <span class="metric-value">9.7</span>
              </div>
            </div>
            <div class="review-action">
              <el-button class="action-btn mini-btn" @click="$router.push('/about')">
                查看完整测评
                <el-icon><ArrowRight /></el-icon>
              </el-button>
            </div>
            <div class="review-phone-tag">专业横评报告</div>
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
  min-height: 100vh;  /* 最小高度为视口高度的100%，确保页面至少填满整个屏幕 */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);  /* 从左上到右下的渐变背景 */
  display: flex;  /* 使用弹性布局 */
  align-items: center;  /* 垂直居中内容 */
  justify-content: center;  /* 水平居中内容 */
  padding: 20px;  /* 四周内边距 */
  position: relative;  /* 相对定位，使子元素的绝对定位以此为参考 */
  overflow: hidden;  /* 隐藏溢出内容 */
  will-change: transform; /* 性能优化，告诉浏览器该元素的transform属性将会改变 */
}

.home-container {
  width: 100%;  /* 容器宽度占满父元素 */
  max-width: 1000px;  /* 最大宽度限制，防止在大屏幕上过宽 */
  margin: 0 auto;  /* 水平居中 */
  position: relative;  /* 建立定位上下文 */
  z-index: 1;  /* 确保内容在背景之上 */
  display: flex;  /* 使用弹性布局 */
  flex-direction: column;  /* 子元素垂直排列 */
  align-items: center;  /* 水平居中子元素 */
  gap: 40px; /* 各部分之间的间距 */
  padding: 60px 20px;  /* 上下60px、左右20px的内边距 */
}

/* 动画过渡效果 */
.fade-up {
  opacity: 0;  /* 初始状态不可见 */
  transform: translateY(40px);  /* 初始状态向下偏移40px */
  transition: all 0s;  /* 初始无过渡效果 */
  pointer-events: none;  /* 初始状态不响应鼠标事件 */
  will-change: opacity, transform;  /* 性能优化 */
}

.fade-up.animated {
  transition: opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),  /* 透明度过渡效果 */
              transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);  /* 位移过渡效果 */
}

.fade-up.animated.visible {
  opacity: 1;  /* 可见状态 */
  transform: translateY(0);  /* 位置恢复正常 */
  pointer-events: auto;  /* 可以响应鼠标事件 */
}

.bg-gradient-1,
.bg-gradient-2 {
  position: absolute;  /* 绝对定位 */
  border-radius: 50%;  /* 圆形边框 */
  filter: blur(60px);  /* 高斯模糊效果 */
  z-index: 0;  /* 放在最底层 */
  opacity: 0.5;  /* 半透明 */
  will-change: transform; /* 性能优化 */
}

.bg-gradient-1 {
  background: radial-gradient(circle, rgba(66, 185, 131, 0.3) 0%, rgba(255, 255, 255, 0) 70%);  /* 绿色到透明的径向渐变 */
  width: 50vw;  /* 宽度为视口宽度的50% */
  height: 50vw;  /* 高度为视口宽度的50% */
  top: -10vw;  /* 顶部偏移 */
  right: -10vw;  /* 右侧偏移 */
  animation: float-1 15s ease-in-out infinite alternate;  /* 应用漂浮动画 */
}

.bg-gradient-2 {
  background: radial-gradient(circle, rgba(91, 143, 249, 0.3) 0%, rgba(255, 255, 255, 0) 70%);  /* 蓝色到透明的径向渐变 */
  width: 60vw;  /* 宽度为视口宽度的60% */
  height: 60vw;  /* 高度为视口宽度的60% */
  bottom: -20vw;  /* 底部偏移 */
  left: -20vw;  /* 左侧偏移 */
  animation: float-2 20s ease-in-out infinite alternate;  /* 应用漂浮动画 */
}

@keyframes float-1 {
  0% {
    transform: translate(0, 0);  /* 起始位置 */
  }
  100% {
    transform: translate(-5vw, 5vw);  /* 结束位置，向左上移动 */
  }
}

@keyframes float-2 {
  0% {
    transform: translate(0, 0);  /* 起始位置 */
  }
  100% {
    transform: translate(5vw, -5vw);  /* 结束位置，向右下移动 */
  }
}

.phone-wrapper {
  perspective: 1500px;  /* 3D透视效果 */
  transform-style: preserve-3d;  /* 保留3D变换 */
  position: relative;  /* 相对定位 */
  margin: 20px 0 40px;  /* 上下外边距 */
}

.phone-wrapper::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 280px; /* 增大阴影尺寸 */
  height: 45px;  /* 阴影高度 */
  bottom: -20px;  /* 底部定位 */
  left: 50%;  /* 水平居中定位 */
  transform: translateX(-50%);  /* 精确水平居中 */
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%);  /* 阴影渐变效果 */
  border-radius: 50%;  /* 圆形边框 */
  z-index: -1;  /* 置于内容下方 */
  filter: blur(10px);  /* 模糊效果 */
}

.content-header {
  text-align: center;  /* 文本居中 */
  margin-bottom: 10px;  /* 底部外边距 */
  position: relative;  /* 相对定位 */
}

.content-header::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  bottom: -15px;  /* 底部定位 */
  left: 50%;  /* 水平居中 */
  transform: translateX(-50%);  /* 精确水平居中 */
  width: 60px;  /* 宽度 */
  height: 4px;  /* 高度 */
  background: linear-gradient(to right, #42b983, #2f9768);  /* 绿色渐变背景 */
  border-radius: 2px;  /* 圆角 */
}

.title {
  font-size: 3.5rem;  /* 大字体尺寸 */
  margin-bottom: 10px;  /* 底部外边距 */
  background: linear-gradient(to right, #42b983, #2c8b63);  /* 渐变背景 */
  -webkit-background-clip: text;  /* 背景裁剪到文字 */
  -webkit-text-fill-color: transparent;  /* 文字填充透明 */
  background-clip: text;  /* 标准属性 */
  font-weight: 900;  /* 超粗体 */
  letter-spacing: -0.5px;  /* 字间距 */
  line-height: 1.1;  /* 行高 */
  position: relative;  /* 相对定位 */
  display: inline-block;  /* 行内块显示 */
  animation: title-float 4s ease-in-out infinite;  /* 应用浮动动画 */
  filter: drop-shadow(0 2px 4px rgba(66, 185, 131, 0.3));  /* 阴影效果 */
  transition: all 0.5s ease;  /* 过渡效果 */
  text-rendering: geometricPrecision;  /* 文字渲染精度 */
}

@keyframes title-float {
  0%, 100% {
    transform: translateY(0);  /* 起始和结束位置 */
    filter: drop-shadow(0 2px 4px rgba(66, 185, 131, 0.3));  /* 起始阴影 */
  }
  50% {
    transform: translateY(-15px);  /* 中间上浮位置 */
    filter: drop-shadow(0 4px 8px rgba(66, 185, 131, 0.4));  /* 中间阴影更强 */
  }
}

.title:hover {
  transform: scale(1.05);  /* 悬停时放大 */
  filter: drop-shadow(0 3px 6px rgba(66, 185, 131, 0.5));  /* 悬停时阴影增强 */
}

.highlight-text {
  position: relative;  /* 相对定位 */
  background: linear-gradient(to right, #37a873, #287057);  /* 渐变背景 */
  -webkit-background-clip: text;  /* 背景裁剪到文字 */
  -webkit-text-fill-color: transparent;  /* 文字填充透明 */
  background-clip: text;  /* 标准属性 */
  font-weight: 900;  /* 超粗体 */
  animation: text-pulse 4s ease-in-out infinite;  /* 应用脉冲动画 */
}

@keyframes text-pulse {
  0%, 100% {
    opacity: 1;  /* 完全不透明 */
    filter: none;  /* 无滤镜 */
    transform: scale(1);  /* 原始大小 */
  }
  50% {
    opacity: 0.98;  /* 轻微透明 */
    filter: drop-shadow(0 0 2px rgba(66, 185, 131, 0.4));  /* 中间阴影 */
    transform: scale(1.03);  /* 轻微放大 */
  }
}

/* 移除下方绿线动画 */
.highlight-text::after {
  display: none;  /* 不显示此元素 */
}

.subtitle {
  font-size: 1.6rem;  /* 字体尺寸 */
  color: #555;  /* 文字颜色 */
  font-weight: 300;  /* 字体粗细 */
  margin: 0;  /* 外边距清零 */
  animation: subtitle-appear 1.5s ease-out;  /* 应用出现动画 */
  opacity: 0;  /* 初始不可见 */
  animation-fill-mode: forwards;  /* 保持动画结束状态 */
  animation-delay: 0.5s;  /* 延迟开始动画 */
}

@keyframes subtitle-appear {
  0% {
    opacity: 0;  /* 起始不可见 */
    transform: translateY(20px);  /* 初始向下偏移 */
  }
  100% {
    opacity: 1;  /* 结束完全可见 */
    transform: translateY(0);  /* 恢复原位置 */
  }
}

/* 标题动画增强 */
.content-header.animated.visible {
  animation: header-appear 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;  /* 应用头部出现动画 */
}

@keyframes header-appear {
  0% {
    opacity: 0;  /* 起始不可见 */
    transform: translateY(80px) scale(0.8);  /* 初始缩小并向下偏移 */
  }
  60% {
    opacity: 1;  /* 完全可见 */
    transform: translateY(-10px) scale(1.05);  /* 略微上移并放大 */
  }
  100% {
    opacity: 1;  /* 保持可见 */
    transform: translateY(0) scale(1);  /* 恢复原始大小和位置 */
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2.8rem;  /* 在小屏幕上减小字体大小 */
  }
  
  .subtitle {
    font-size: 1.3rem;  /* 在小屏幕上减小字体大小 */
  }
}

@media (min-width: 1200px) {
  .title {
    font-size: 4rem;  /* 在大屏幕上增大字体大小 */
  }
  
  .subtitle {
    font-size: 1.8rem;  /* 在大屏幕上增大字体大小 */
  }
}

/* 功能展示区 - 改进视觉效果 */
.features-showcase {
  display: grid;  /* 网格布局 */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));  /* 响应式网格列 */
  gap: 20px;  /* 网格间距 */
  width: 100%;  /* 宽度占满容器 */
  max-width: 900px;  /* 最大宽度限制 */
}

/* 为功能卡片添加延迟动画效果 */
.features-showcase.visible .feature-card:nth-child(1) {
  animation: feature-appear 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s forwards;  /* 第一张卡片的出现动画 */
}

.features-showcase.visible .feature-card:nth-child(2) {
  animation: feature-appear 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s forwards;  /* 第二张卡片的出现动画 */
}

.features-showcase.visible .feature-card:nth-child(3) {
  animation: feature-appear 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s forwards;  /* 第三张卡片的出现动画 */
}

.features-showcase.visible .feature-card:nth-child(4) {
  animation: feature-appear 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s forwards;  /* 第四张卡片的出现动画 */
}

@keyframes feature-appear {
  from {
    opacity: 0;  /* 初始不可见 */
    transform: translateY(30px);  /* 初始向下偏移 */
  }
  to {
    opacity: 1;  /* 结束完全可见 */
    transform: translateY(0);  /* 恢复原位置 */
  }
}

.feature-card {
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  gap: 20px;  /* 子元素间距 */
  padding: 20px;  /* 内边距 */
  background: rgba(255, 255, 255, 0.7);  /* 半透明白色背景 */
  border-radius: 16px;  /* 圆角 */
  transition: all 0.3s ease;  /* 过渡效果 */
  border-left: 4px solid transparent;  /* 左边框 */
  opacity: 0;  /* 初始不可见 */
  transform: translateY(30px);  /* 初始向下偏移 */
  backdrop-filter: blur(10px);  /* 背景模糊效果 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);  /* 阴影效果 */
}

.feature-card:hover {
  transform: translateY(-5px);  /* 悬停时向上移动 */
  background: rgba(255, 255, 255, 0.9);  /* 悬停时背景更不透明 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);  /* 悬停时阴影更强 */
  border-left: 4px solid #42b983;  /* 悬停时左边框变绿色 */
}

.feature-icon {
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  justify-content: center;  /* 水平居中 */
  width: 65px;  /* 图标宽度 */
  height: 65px;  /* 图标高度 */
  border-radius: 50%;  /* 圆形 */
  background: linear-gradient(135deg, #42b983 0%, #2f9768 100%);  /* 绿色渐变背景 */
  color: white;  /* 白色文字 */
  flex-shrink: 0;  /* 禁止缩小 */
  box-shadow: 0 8px 20px rgba(66, 185, 131, 0.3);  /* 阴影效果 */
  transition: transform 0.3s ease;  /* 变换过渡效果 */
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);  /* 悬停时图标放大并旋转 */
}

.feature-text h3 {
  margin: 0 0 8px;  /* 外边距 */
  font-size: 1.3rem;  /* 字体大小 */
  font-weight: 600;  /* 字体粗细 */
  color: #303133;  /* 文字颜色 */
}

.feature-text p {
  margin: 0;  /* 外边距清零 */
  color: #606266;  /* 文字颜色 */
  font-size: 1rem;  /* 字体大小 */
  line-height: 1.6;  /* 行高 */
}

/* 操作按钮区 - 增强交互性 */
.action-container {
  width: 100%;  /* 宽度100% */
  max-width: 900px;  /* 最大宽度 */
  display: flex;  /* 弹性布局 */
  flex-direction: column;  /* 纵向排列 */
  gap: 20px;  /* 间距 */
  align-items: center;  /* 居中对齐 */
}

/* 主要操作按钮容器 */
.primary-action-wrapper {
  width: 100%;  /* 宽度100% */
  display: flex;  /* 弹性布局 */
  justify-content: center;  /* 水平居中 */
  margin-bottom: 10px;  /* 底部外边距 */
}

.quick-links {
  display: flex;  /* 弹性布局 */
  flex-wrap: wrap;  /* 允许换行 */
  gap: 15px;  /* 间距 */
  width: 100%;  /* 宽度100% */
  justify-content: center;  /* 水平居中 */
}

.action-btn {
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  justify-content: center;  /* 水平居中 */
  gap: 10px;  /* 内部元素间距 */
  font-weight: 600;  /* 字体粗细 */
  padding: 14px 25px;  /* 内边距 */
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);  /* 过渡效果 */
  border-radius: 12px;  /* 圆角 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出 */
}

.action-btn::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  top: 0;  /* 顶部定位 */
  left: 0;  /* 左侧定位 */
  width: 100%;  /* 宽度100% */
  height: 100%;  /* 高度100% */
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%);  /* 白色闪光渐变 */
  transform: translateX(-100%);  /* 初始位置在左侧外部 */
  transition: transform 0.6s ease;  /* 过渡效果 */
}

.action-btn:hover::before {
  transform: translateX(100%);  /* 悬停时移动到右侧外部 */
}

/* 增强主要按钮 */
.primary-action {
  font-size: 1.3rem; /* 放大字体 */
  box-shadow: 0 10px 25px rgba(66, 185, 131, 0.25);  /* 阴影效果 */
  min-width: 300px; /* 增加最小宽度 */
  max-width: 400px; /* 限制最大宽度 */
  width: 80%; /* 设置为容器的80%宽 */
  padding: 18px 30px; /* 增加内边距使按钮更大 */
  background: linear-gradient(135deg, #42b983, #2f9768, #238957); /* 更丰富的渐变 */
  position: relative;  /* 相对定位 */
  z-index: 2;  /* 确保在上层 */
  letter-spacing: 1px; /* 增加字间距 */
  border: none;  /* 无边框 */
  transform: scale(1.15); /* 默认就放大一点 */
  margin: 10px 0; /* 调整外边距 */
  overflow: visible; /* 允许阴影和光晕效果溢出 */
}

/* 呼吸效果 */
.pulse-effect {
  animation: button-pulse 3s infinite;  /* 应用脉冲动画 */
}

.primary-action .arrow-icon {
  font-size: 1.3rem;  /* 图标字体大小 */
  margin-left: 8px;  /* 左侧外边距 */
  animation: arrow-bounce 1.5s infinite;  /* 应用箭头弹跳动画 */
}

@keyframes button-pulse {
  0%, 100% {
    transform: scale(1.15);  /* 初始和结束大小 */
    box-shadow: 
      0 10px 25px rgba(66, 185, 131, 0.25),  /* 阴影效果 */
      0 0 0 0 rgba(66, 185, 131, 0.5);  /* 无外发光 */
  }
  50% {
    transform: scale(1.2);  /* 中间状态放大 */
    box-shadow: 
      0 15px 30px rgba(66, 185, 131, 0.35),  /* 更强阴影 */
      0 0 20px 10px rgba(66, 185, 131, 0.2);  /* 添加外发光 */
  }
}

@keyframes arrow-bounce {
  0%, 100% {
    transform: translateX(0);  /* 初始和结束位置 */
  }
  50% {
    transform: translateX(8px);  /* 中间状态向右移动 */
  }
}

/* 添加点击感觉 */
.primary-action:active {
  transform: scale(1.1);  /* 点击时缩小 */
  box-shadow: 0 5px 15px rgba(66, 185, 131, 0.3);  /* 点击时阴影减弱 */
}

.primary-action:hover {
  transform: translateY(-5px) scale(1.2);  /* 悬停时上移并放大 */
  box-shadow: 
    0 15px 30px rgba(66, 185, 131, 0.4),  /* 增强阴影 */
    0 0 30px 5px rgba(66, 185, 131, 0.25);  /* 添加发光效果 */
  background: linear-gradient(135deg, #4ecf94, #42b983, #2f9768); /* 悬停时颜色微调 */
}

.secondary-action {
  flex: 1;  /* 弹性增长 */
  min-width: 150px;  /* 最小宽度 */
}

.secondary-action:hover {
  transform: translateY(-3px);  /* 悬停时上移 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);  /* 悬停时阴影 */
}

/* 为重播按钮添加样式 */
.quick-links .action-btn:last-child {
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出 */
}

.quick-links .action-btn:last-child::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  inset: 0;  /* 四周定位为0 */
  background: linear-gradient(120deg, 
    rgba(66, 185, 131, 0.1) 0%, 
    rgba(66, 185, 131, 0.2) 50%, 
    rgba(66, 185, 131, 0.1) 100%);  /* 绿色渐变 */
  transform: translateX(-100%);  /* 初始位置 */
  transition: transform 0.6s ease;  /* 过渡效果 */
}

.quick-links .action-btn:last-child:hover::after {
  transform: translateX(0);  /* 悬停时移动到原位 */
}

.quick-links .action-btn:last-child .el-icon {
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);  /* 过渡效果 */
}

.quick-links .action-btn:last-child:hover .el-icon {
  transform: rotate(180deg);  /* 悬停时旋转图标 */
}

/* 数据统计区 - 增强视觉效果 */
.stats-showcase {
  display: flex;  /* 弹性布局 */
  justify-content: space-around;  /* 均匀分布 */
  padding: 25px;  /* 内边距 */
  background: linear-gradient(135deg, rgba(66, 185, 131, 0.05), rgba(47, 151, 104, 0.15));  /* 背景渐变 */
  border-radius: 20px;  /* 圆角 */
  box-shadow: 
    inset 0 0 20px rgba(255, 255, 255, 0.8),  /* 内阴影 */
    0 5px 15px rgba(0, 0, 0, 0.05);  /* 外阴影 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出 */
  width: 100%;  /* 宽度100% */
  max-width: 700px;  /* 最大宽度 */
  backdrop-filter: blur(10px);  /* 背景模糊 */
}

.stats-showcase::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  top: -50%;  /* 顶部定位 */
  left: -50%;  /* 左侧定位 */
  width: 200%;  /* 宽度200% */
  height: 200%;  /* 高度200% */
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);  /* 径向渐变 */
  opacity: 0;  /* 初始不可见 */
  animation: stats-pulse 5s ease-in-out infinite;  /* 应用脉冲动画 */
}

@keyframes stats-pulse {
  0%, 100% {
    opacity: 0;  /* 起始和结束不可见 */
    transform: scale(0.8);  /* 缩小状态 */
  }
  50% {
    opacity: 1;  /* 中间状态完全可见 */
    transform: scale(1);  /* 原始大小 */
  }
}

.stat-item {
  text-align: center;  /* 文本居中 */
  position: relative;  /* 相对定位 */
  transition: transform 0.3s ease;  /* 过渡效果 */
  opacity: 0;  /* 初始不可见 */
}

.stat-item:hover {
  transform: translateY(-5px);  /* 悬停时上移 */
}

.stat-number {
  font-size: 2.2rem;  /* 字体大小 */
  font-weight: 800;  /* 字体粗细 */
  background: linear-gradient(to right, #42b983, #2f9768);  /* 渐变背景 */
  -webkit-background-clip: text;  /* 背景裁剪为文本 */
  -webkit-text-fill-color: transparent;  /* 文本填充透明 */
  background-clip: text;  /* 标准属性 */
  margin-bottom: 5px;  /* 底部外边距 */
  position: relative;  /* 相对定位 */
  display: inline-block;  /* 行内块显示 */
}

.stat-number::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  bottom: 0px;  /* 底部定位 */
  left: 25%;  /* 左侧定位 */
  width: 50%;  /* 宽度50% */
  height: 3px;  /* 高度 */
  background: linear-gradient(to right, transparent, #42b983, transparent);  /* 渐变背景 */
  border-radius: 3px;  /* 圆角 */
  opacity: 0;  /* 初始不可见 */
  transform: scaleX(0);  /* 初始宽度为0 */
  transition: all 0.3s ease;  /* 过渡效果 */
}

.stat-item:hover .stat-number::after {
  opacity: 1;  /* 悬停时可见 */
  transform: scaleX(1);  /* 悬停时宽度为100% */
}

.stat-label {
  font-size: 1rem;  /* 字体大小 */
  color: #606266;  /* 文字颜色 */
  font-weight: 500;  /* 字体粗细 */
}

/* 为统计数据添加动画效果 */
.stats-showcase.visible .stat-item:nth-child(1) {
  animation: stat-count-up 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s forwards;  /* 第一个统计项的动画 */
}

.stats-showcase.visible .stat-item:nth-child(2) {
  animation: stat-count-up 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s forwards;  /* 第二个统计项的动画 */
}

.stats-showcase.visible .stat-item:nth-child(3) {
  animation: stat-count-up 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s forwards;  /* 第三个统计项的动画 */
}

@keyframes stat-count-up {
  0% {
    transform: translateY(20px);  /* 初始向下偏移 */
    opacity: 0;  /* 初始不可见 */
  }
  50% {
    opacity: 1;  /* 中间状态可见 */
  }
  100% {
    transform: translateY(0);  /* 最终位置 */
    opacity: 1;  /* 完全可见 */
  }
}

/* 热门机型标签 - 增强交互性 */
.trending-phones {
  width: 100%;  /* 宽度100% */
  max-width: 900px;  /* 最大宽度 */
}

.section-title {
  font-size: 1.4rem;  /* 字体大小 */
  color: #303133;  /* 文字颜色 */
  margin-bottom: 20px;  /* 底部外边距 */
  position: relative;  /* 相对定位 */
  padding-left: 18px;  /* 左侧内边距 */
  display: inline-block;  /* 行内块显示 */
}

.section-title::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  left: 0;  /* 左侧定位 */
  top: 50%;  /* 顶部定位 */
  transform: translateY(-50%);  /* 垂直居中 */
  width: 6px;  /* 宽度 */
  height: 25px;  /* 高度 */
  background: #42b983;  /* 背景色 */
  border-radius: 3px;  /* 圆角 */
}

.phone-tags {
  display: flex;  /* 弹性布局 */
  flex-wrap: wrap;  /* 允许换行 */
  justify-content: center;  /* 水平居中 */
  gap: 15px;  /* 间距 */
}

.phone-tag {
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  gap: 10px;  /* 内部元素间距 */
  padding: 10px 20px;  /* 内边距 */
  background: rgba(255, 255, 255, 0.8);  /* 背景色 */
  border-radius: 30px;  /* 圆角 */
  transition: all 0.3s ease;  /* 过渡效果 */
  cursor: pointer;  /* 鼠标指针 */
  border: 1px solid rgba(0, 0, 0, 0.05);  /* 边框 */
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);  /* 阴影 */
  opacity: 0;  /* 初始不可见 */
  backdrop-filter: blur(10px);  /* 背景模糊 */
}

.phone-tag:hover {
  transform: translateY(-5px) rotate(1deg);  /* 悬停时上移并轻微旋转 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);  /* 悬停时阴影增强 */
  background: white;  /* 悬停时背景变为纯白 */
}

.phone-tag:nth-child(odd):hover {
  transform: translateY(-5px) rotate(-1deg);  /* 奇数标签悬停时向左旋转 */
}

.tag-icon {
  font-size: 1.3rem;  /* 图标大小 */
  transition: transform 0.3s ease;  /* 过渡效果 */
}

.phone-tag:hover .tag-icon {
  transform: scale(1.2);  /* 悬停时图标放大 */
}

/* 为热门手机标签添加动画效果 */
.trending-phones.visible .phone-tag:nth-child(1) {
  animation: tag-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s forwards;  /* 第一个标签的动画 */
}

.trending-phones.visible .phone-tag:nth-child(2) {
  animation: tag-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s forwards;  /* 第二个标签的动画 */
}

.trending-phones.visible .phone-tag:nth-child(3) {
  animation: tag-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s forwards;  /* 第三个标签的动画 */
}

.trending-phones.visible .phone-tag:nth-child(4) {
  animation: tag-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s forwards;  /* 第四个标签的动画 */
}

.trending-phones.visible .phone-tag:nth-child(5) {
  animation: tag-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s forwards;  /* 第五个标签的动画 */
}

@keyframes tag-appear {
  from {
    opacity: 0;  /* 初始不可见 */
    transform: translateX(-20px);  /* 初始向左偏移 */
  }
  to {
    opacity: 1;  /* 完全可见 */
    transform: translateX(0);  /* 恢复原位置 */
  }
}

/* 为按钮添加延迟动画 */
.quick-links.visible {
  animation: buttons-appear 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;  /* 应用按钮出现动画 */
}

@keyframes buttons-appear {
  0% {
    opacity: 0;  /* 初始不可见 */
    transform: scale(0.95);  /* 初始缩小 */
  }
  100% {
    opacity: 1;  /* 完全可见 */
    transform: scale(1);  /* 恢复原大小 */
  }
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .features-showcase {
    grid-template-columns: 1fr;  /* 在中等屏幕上改为单列布局 */
    max-width: 500px;  /* 限制最大宽度 */
  }
  
  .action-btn {
    padding: 12px 20px;  /* 减小按钮内边距 */
}

  .title {
    font-size: 2.5rem;  /* 减小标题字体 */
}

  .subtitle {
  font-size: 1.2rem;  /* 减小副标题字体 */
  }
}

@media (max-width: 768px) {
  .home-view {
    padding: 10px;  /* 在小屏幕上减少内边距 */
  }
  
  .home-container {
    padding: 40px 15px;  /* 减少内容容器的内边距 */
    gap: 30px;  /* 减少各部分之间的间距 */
  }
  
  .title {
    font-size: 2.8rem;  /* 减小标题字体大小 */
  }
  
  .subtitle {
    font-size: 1.3rem;  /* 减小副标题字体大小 */
  }
  
  .stats-showcase {
    flex-wrap: wrap;  /* 允许统计项目换行 */
    gap: 15px;  /* 设置间距 */
    padding: 20px;  /* 减少内边距 */
  }
  
  .stat-item {
    flex: 0 0 calc(50% - 15px);  /* 在小屏幕上每行显示两个统计项 */
  }
  
  .stat-number {
    font-size: 1.8rem;  /* 减小统计数字的字体大小 */
}

  .feature-card {
    padding: 15px;  /* 减少功能卡片的内边距 */
  }
  
  .feature-icon {
    width: 55px;  /* 减小图标尺寸 */
    height: 55px;  /* 减小图标尺寸 */
  }
  
  .feature-text h3 {
    font-size: 1.1rem;  /* 减小标题字体大小 */
  }
  
  .feature-text p {
    font-size: 0.9rem;  /* 减小正文字体大小 */
  }
  
  .section-title {
    font-size: 1.2rem;  /* 减小部分标题字体大小 */
  }
  
  .phone-tag {
    padding: 8px 15px;  /* 减小手机标签的内边距 */
  }
}

/* 优化的iPhone模型动画性能 */
.phone-model {
  position: relative;  /* 相对定位 */
  width: 320px; /* 增大尺寸 */
  height: 620px; /* 增大尺寸 */
  background: linear-gradient(145deg, 
    #f0f0f0 0%, 
    #dadada 20%, 
    #c8c8c8 40%,
    #d5d5d5 60%, 
    #e8e8e8 80%,
    #f5f5f5 100%
  );  /* 渐变背景模拟金属质感 */
  border-radius: 55px;  /* 圆角 */
  box-shadow:
    0 0 0 1px rgba(230, 230, 230, 0.4),  /* 边框阴影 */
    0 35px 65px rgba(0, 0, 0, 0.3),  /* 主阴影 */
    0 20px 35px rgba(0, 0, 0, 0.2);  /* 次阴影 */
  z-index: 0;  /* 层叠顺序 */
  transform-style: preserve-3d;  /* 保留3D变换 */
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);  /* 变换过渡效果 */
  overflow: visible;  /* 允许内容溢出 */
  cursor: pointer;  /* 鼠标指针样式 */
  will-change: transform; /* 性能优化 */
  animation: phone-float 2.5s ease-in-out infinite; /* 加快动画速度 */
  animation-play-state: running;  /* 动画播放状态 */
}

.phone-model:hover {
  animation-play-state: paused;  /* 悬停时暂停动画 */
}

@keyframes phone-float {
  0%, 100% {
    transform: perspective(2000px) translateY(0) rotateX(2deg) rotateY(-5deg) scale(1);  /* 初始和结束状态 */
    box-shadow:
      0 0 0 1px rgba(230, 230, 230, 0.4),  /* 边框阴影 */
      0 35px 65px rgba(0, 0, 0, 0.3),  /* 主阴影 */
      0 20px 35px rgba(0, 0, 0, 0.2);  /* 次阴影 */
  }
  50% {
    transform: perspective(2000px) translateY(-25px) rotateX(-2deg) rotateY(5deg) scale(1.04);  /* 中间状态，上浮且旋转 */
    box-shadow:
      0 0 0 1px rgba(230, 230, 230, 0.4),  /* 边框阴影 */
      0 60px 100px rgba(0, 0, 0, 0.25),  /* 增强主阴影 */
      0 35px 55px rgba(0, 0, 0, 0.15);  /* 增强次阴影 */
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
  );  /* 银色渐变背景 */
  border: 1px solid rgba(255, 255, 255, 0.8);  /* 白色边框 */
  position: relative;  /* 相对定位 */
}

.iphone-16-pro::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  inset: 0;  /* 填满整个元素 */
  background: linear-gradient(120deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.5) 15%,
    rgba(255, 255, 255, 0.2) 30%,
    rgba(255, 255, 255, 0.15) 45%,
    rgba(255, 255, 255, 0.2) 60%,
    rgba(255, 255, 255, 0.5) 75%,
    rgba(255, 255, 255, 0.95) 100%
  );  /* 光泽效果渐变 */
  border-radius: inherit;  /* 继承父元素的圆角 */
  z-index: 2;  /* 层叠顺序 */
  pointer-events: none;  /* 不影响鼠标事件 */
  opacity: 0.9;  /* 透明度 */
  animation: metal-shine 4s linear infinite;  /* 金属光泽动画 */
}

.iphone-16-pro::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  inset: 0;  /* 填满整个元素 */
  border-radius: inherit;  /* 继承父元素的圆角 */
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");  /* SVG噪点纹理 */
  background-size: 100px 100px;  /* 背景大小 */
  opacity: 0.07;  /* 透明度 */
  mix-blend-mode: overlay;  /* 混合模式 */
  pointer-events: none;  /* 不影响鼠标事件 */
}

@keyframes metal-shine {
  0%, 100% {
    opacity: 0.9;  /* 初始和结束透明度 */
    background-position: 0% 0%;  /* 初始和结束位置 */
  }
  50% {
    opacity: 0.7;  /* 中间透明度 */
    background-position: 100% 100%;  /* 中间位置 */
  }
}

.phone-reflection {
  position: absolute;  /* 绝对定位 */
  top: 0;  /* 顶部对齐 */
  left: 0;  /* 左侧对齐 */
  right: 0;  /* 右侧对齐 */
  bottom: 0;  /* 底部对齐 */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.6) 15%,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 70%
  );  /* 反光效果渐变 */
  border-radius: inherit;  /* 继承父元素的圆角 */
  pointer-events: none;  /* 不影响鼠标事件 */
  z-index: 5;  /* 层叠顺序 */
  opacity: 0.8;  /* 透明度 */
  transition: opacity 0.3s ease;  /* 透明度过渡效果 */
  animation: reflection-pulse 4s ease-in-out infinite;  /* 反光脉冲动画 */
}

@keyframes reflection-pulse {
  0%, 100% {
    opacity: 0.8;  /* 初始和结束透明度 */
    background-position: 0% 0%;  /* 初始和结束位置 */
  }
  50% {
    opacity: 0.6;  /* 中间透明度 */
    background-position: 100% 100%;  /* 中间位置 */
  }
}

/* 侧边按钮 */
.side-buttons {
  position: absolute;  /* 绝对定位 */
  right: -2px;  /* 右侧定位 */
  top: 120px;  /* 顶部定位 */
  display: flex;  /* 弹性布局 */
  flex-direction: column;  /* 垂直排列 */
  gap: 20px;  /* 间距 */
  z-index: 3;  /* 层叠顺序 */
}

.volume-up, .volume-down, .power-button {
  width: 3px;  /* 宽度 */
  height: 30px;  /* 高度 */
  background: linear-gradient(to right, #777, #999);  /* 渐变背景 */
  border-radius: 2px;  /* 圆角 */
  box-shadow: 
    -1px 0 2px rgba(0, 0, 0, 0.5),  /* 阴影 */
    inset 1px 0 1px rgba(255, 255, 255, 0.3);  /* 内阴影 */
}

.action-button {
  width: 3px;  /* 宽度 */
  height: 35px;  /* 高度 */
  background: linear-gradient(to right, #777, #999);  /* 渐变背景 */
  border-radius: 2px;  /* 圆角 */
  margin-top: 40px;  /* 顶部外边距 */
  box-shadow: 
    -1px 0 2px rgba(0, 0, 0, 0.5),  /* 阴影 */
    inset 1px 0 1px rgba(255, 255, 255, 0.3);  /* 内阴影 */
}

/* 底部扬声器 */
.phone-model::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  bottom: 15px;  /* 底部定位 */
  left: 50%;  /* 水平居中 */
  transform: translateX(-50%);  /* 精确水平居中 */
  width: 100px;  /* 宽度 */
  height: 3px;  /* 高度 */
  background: #333;  /* 背景色 */
  border-radius: 3px;  /* 圆角 */
  z-index: 10;  /* 层叠顺序 */
  box-shadow: 
    inset 0 0 0 1px rgba(255, 255, 255, 0.3),  /* 内阴影 */
    0 0 2px rgba(0, 0, 0, 0.5);  /* 外阴影 */
}

/* 应用图标动画效果 */
.app-pressed {
  transform: scale(0.9);  /* 按下时缩小 */
  opacity: 0.7;  /* 按下时半透明 */
}

/* 动态岛 */
.dynamic-island {
  position: absolute;  /* 绝对定位 */
  top: 12px;  /* 顶部定位 */
  left: 50%;  /* 水平居中 */
  transform: translateX(-50%);  /* 精确水平居中 */
  width: 120px;  /* 宽度 */
  height: 34px;  /* 高度 */
  background: #000;  /* 背景色 */
  border-radius: 20px;  /* 圆角 */
  z-index: 10;  /* 层叠顺序 */
  box-shadow: 
    0 0 5px rgba(0, 0, 0, 0.8),  /* 外阴影 */
    inset 0 0 2px rgba(255, 255, 255, 0.1);  /* 内阴影 */
  overflow: hidden;  /* 隐藏溢出内容 */
  transition: all 0.3s ease;  /* 过渡效果 */
}

.phone-model:hover .dynamic-island {
  transform: translateX(-50%) scale(1.05);  /* 悬停时放大 */
  box-shadow: 
    0 0 8px rgba(0, 0, 0, 0.8),  /* 增强外阴影 */
    inset 0 0 4px rgba(255, 255, 255, 0.2);  /* 增强内阴影 */
}

/* 屏幕 */
.screen {
  position: absolute;  /* 绝对定位 */
  top: 10px;  /* 顶部定位 */
  left: 10px;  /* 左侧定位 */
  right: 10px;  /* 右侧定位 */
  bottom: 10px;  /* 底部定位 */
  background: linear-gradient(125deg, #2C5364, #203A43, #0F2027);  /* 深色渐变背景 */
  border-radius: 42px;  /* 圆角 */
  overflow: hidden;  /* 隐藏溢出内容 */
  display: flex;  /* 弹性布局 */
  flex-direction: column;  /* 垂直排列 */
  box-shadow: 
    inset 0 0 15px rgba(0, 0, 0, 0.7),  /* 内阴影 */
    inset 0 0 3px rgba(255, 255, 255, 0.1);  /* 内亮边 */
  box-sizing: border-box;  /* 盒模型计算方式 */
  padding: 0;  /* 内边距 */
}

/* 动态岛内容 */
.dynamic-island-content {
  position: relative;  /* 相对定位 */
  width: 100%;  /* 宽度100% */
  height: 100%;  /* 高度100% */
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  justify-content: space-between;  /* 两端对齐 */
  padding: 0 15px;  /* 水平内边距 */
}

.island-pill {
  position: absolute;  /* 绝对定位 */
  left: 50%;  /* 水平居中 */
  top: 50%;  /* 垂直居中 */
  transform: translate(-50%, -50%);  /* 精确居中 */
  width: 60px;  /* 宽度 */
  height: 5px;  /* 高度 */
  background: rgba(60, 60, 60, 0.9);  /* 背景色 */
  border-radius: 3px;  /* 圆角 */
  opacity: 0.5;  /* 透明度 */
}

.island-camera {
  position: absolute;  /* 绝对定位 */
  top: 50%;  /* 垂直居中 */
  right: 30px;  /* 右侧定位 */
  transform: translateY(-50%);  /* 精确垂直居中 */
  width: 10px;  /* 宽度 */
  height: 10px;  /* 高度 */
  background: #1a1a1a;  /* 背景色 */
  border-radius: 50%;  /* 圆形 */
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.5),  /* 内边框 */
    inset 0 0 2px rgba(255, 255, 255, 0.1),  /* 内发光 */
    0 0 0 1px rgba(0, 0, 0, 0.8);  /* 外边框 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

/* 状态栏 */
.status-bar {
  height: 30px;  /* 高度 */
  display: flex;  /* 弹性布局 */
  justify-content: space-between;  /* 两端对齐 */
  padding: 38px 25px 0;  /* 内边距，顶部较大以避开动态岛 */
  color: white;  /* 文字颜色 */
  font-size: 14px;  /* 字体大小 */
  position: relative;  /* 相对定位 */
  z-index: 1;  /* 层叠顺序 */
  background: rgba(0, 0, 0, 0.1);  /* 背景色 */
  backdrop-filter: blur(10px);  /* 背景模糊 */
  -webkit-backdrop-filter: blur(10px);  /* Safari支持 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);  /* 底部边框 */
}

.time {
  font-weight: 600;  /* 字体粗细 */
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.3);  /* 文字阴影 */
  letter-spacing: 0.5px;  /* 字间距 */
}

.indicators {
  display: flex;  /* 弹性布局 */
  gap: 8px;  /* 间距 */
}

/* 应用网格 */
.app-grid {
  flex: 1;  /* 弹性增长 */
  display: grid;  /* 网格布局 */
  grid-template-columns: repeat(4, minmax(0, 1fr));  /* 4列等宽 */
  grid-template-rows: repeat(3, 1fr);  /* 3行等高 */
  gap: 15px;  /* 网格间距 */
  padding: 25px 15px;  /* 内边距 */
  position: relative;  /* 相对定位 */
  z-index: 1;  /* 层叠顺序 */
  width: 100%;  /* 宽度100% */
  box-sizing: border-box;  /* 盒模型计算方式 */
  max-width: 100%;  /* 最大宽度 */
  overflow: visible;  /* 允许内容溢出 */
}

/* 应用图标 */
.app {
  border-radius: 25%;  /* 圆角 */
  box-shadow: 
    0 6px 12px rgba(0, 0, 0, 0.25),  /* 阴影 */
    0 0 0 1px rgba(255, 255, 255, 0.1);  /* 边框 */
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);  /* 过渡效果 */
  position: relative;  /* 相对定位 */
  overflow: visible;  /* 允许内容溢出 */
  display: flex;  /* 弹性布局 */
  flex-direction: column;  /* 垂直排列 */
  align-items: center;  /* 水平居中 */
  justify-content: center;  /* 垂直居中 */
  z-index: 1;  /* 层叠顺序 */
  transform-style: preserve-3d;  /* 保留3D变换 */
  height: auto;  /* 高度自适应 */
  aspect-ratio: 1/1;  /* 宽高比1:1 */
  max-width: 100%;  /* 最大宽度 */
  width: 100%;  /* 宽度100% */
  margin: 0;  /* 外边距 */
}

.app::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  inset: 0;  /* 填满容器 */
  background: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.3) 0%, 
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%);  /* 光泽渐变 */
  border-radius: inherit;  /* 继承圆角 */
  z-index: 2;  /* 层叠顺序 */
}

.app:hover {
  transform: scale(1.15) translateY(-8px) translateZ(20px) rotateX(10deg);  /* 悬停时3D变换效果 */
  box-shadow: 
    0 18px 35px rgba(0, 0, 0, 0.5),  /* 增强阴影 */
    0 0 0 1px rgba(255, 255, 255, 0.15);  /* 增强边框 */
}

.app-icon-content {
  width: 65%;  /* 宽度 */
  height: 65%;  /* 高度 */
  position: relative;  /* 相对定位 */
  z-index: 1;  /* 层叠顺序 */
  border-radius: 22%;  /* 圆角 */
  margin-bottom: 4px;  /* 底部外边距 */
  box-shadow: 
    0 3px 8px rgba(0, 0, 0, 0.2),  /* 阴影 */
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);  /* 内边框 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

.app-label {
  font-size: 10px;  /* 字体大小 */
  color: rgba(255, 255, 255, 0.95);  /* 文字颜色 */
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);  /* 文字阴影 */
  white-space: nowrap;  /* 不换行 */
  overflow: hidden;  /* 隐藏溢出内容 */
  text-overflow: ellipsis;  /* 溢出显示省略号 */
  max-width: 90%;  /* 最大宽度 */
  margin-top: 5px;  /* 顶部外边距 */
  letter-spacing: 0.5px;  /* 字间距 */
  font-weight: 500;  /* 字体粗细 */
}

/* Dock底部栏 */
.dock {
  height: 85px;  /* 高度 */
  margin: 5px 16px 18px;  /* 外边距 */
  background: rgba(255, 255, 255, 0.15);  /* 背景色 */
  border-radius: 30px;  /* 圆角 */
  display: flex;  /* 弹性布局 */
  justify-content: space-around;  /* 均匀分布 */
  align-items: center;  /* 垂直居中 */
  backdrop-filter: blur(25px);  /* 背景模糊 */
  -webkit-backdrop-filter: blur(25px);  /* Safari支持 */
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.4),  /* 外阴影 */
    inset 0 0 0 1px rgba(255, 255, 255, 0.1),  /* 内边框 */
    inset 0 0 5px rgba(255, 255, 255, 0.05);  /* 内发光 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
  z-index: 2;  /* 层叠顺序 */
  box-sizing: border-box;  /* 盒模型计算方式 */
  padding: 0 10px;  /* 水平内边距 */
}

/* Dock中的应用 */
.dock-app {
  width: 54px;  /* 宽度 */
  height: 54px;  /* 高度 */
  border-radius: 16px;  /* 圆角 */
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);  /* 过渡效果 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.4),  /* 阴影 */
    0 0 0 1px rgba(255, 255, 255, 0.1);  /* 边框 */
  z-index: 1;  /* 层叠顺序 */
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  justify-content: center;  /* 水平居中 */
  margin: 0 5px;  /* 外边距 */
  transform-style: preserve-3d;  /* 保留3D变换 */
  transform: translateZ(0);  /* 启用硬件加速 */
}

.dock-app:hover {
  transform: scale(1.25) translateY(-12px) translateZ(30px) rotateX(10deg);  /* 悬停时3D变换效果 */
  box-shadow: 
    0 20px 35px rgba(0, 0, 0, 0.6),  /* 增强阴影 */
    0 0 0 1px rgba(255, 255, 255, 0.2);  /* 增强边框 */
}

/* 重新设计应用图标具体样式，添加更逼真的效果 */
.photos-icon {
  background: linear-gradient(145deg, #f45d5d, #e13a3a);  /* 红色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

.photos-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 80%;  /* 宽度 */
  height: 80%;  /* 高度 */
  top: 10%;  /* 顶部定位 */
  left: 10%;  /* 左侧定位 */
  background: 
    radial-gradient(circle at 25% 25%, #ffeb3b 0%, #ffeb3b 12%, transparent 12.1%, transparent),
    radial-gradient(circle at 75% 25%, #4caf50 0%, #4caf50 12%, transparent 12.1%, transparent),
    radial-gradient(circle at 25% 75%, #03a9f4 0%, #03a9f4 12%, transparent 12.1%, transparent),
    radial-gradient(circle at 75% 75%, #9c27b0 0%, #9c27b0 12%, transparent 12.1%, transparent),
    linear-gradient(to bottom, transparent 0%, transparent 100%);
  border-radius: 20%;
}

.camera-icon {
  background: linear-gradient(145deg, #3d3d3d, #292929);  /* 黑色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

.camera-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 60%;  /* 宽度 */
  height: 60%;  /* 高度 */
  top: 20%;  /* 顶部定位 */
  left: 20%;  /* 左侧定位 */
  background: linear-gradient(145deg, #555, #444);  /* 灰色渐变背景 */
  border-radius: 50%;  /* 圆形 */
  box-shadow: 
    inset 0 0 0 2px rgba(0, 0, 0, 0.4),  /* 内边框 */
    inset 0 0 10px rgba(0, 0, 0, 0.6),  /* 内阴影 */
    0 0 0 3px rgba(30, 30, 30, 0.8);  /* 外边框 */
}

.camera-icon::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 20%;  /* 宽度 */
  height: 20%;  /* 高度 */
  top: 12%;  /* 顶部定位 */
  right: 12%;  /* 右侧定位 */
  background: linear-gradient(145deg, #ffa726, #ff9800);  /* 橙色渐变背景 */
  border-radius: 50%;  /* 圆形 */
  box-shadow: 0 0 5px rgba(255, 152, 0, 0.6);  /* 发光效果 */
}

.calendar-icon {
  background: #ffffff;  /* 白色背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

.calendar-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 100%;  /* 宽度100% */
  height: 30%;  /* 高度30% */
  top: 0;  /* 顶部对齐 */
  left: 0;  /* 左侧对齐 */
  background: linear-gradient(to bottom, #ff3b30, #e62d20);  /* 红色渐变背景 */
  border-radius: 12px 12px 0 0;  /* 上方圆角 */
}

.calendar-icon::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 70%;  /* 宽度70% */
  height: 50%;  /* 高度50% */
  bottom: 15%;  /* 底部定位 */
  left: 15%;  /* 左侧定位 */
  background: #fff;  /* 白色背景 */
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  justify-content: center;  /* 水平居中 */
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;  /* 系统字体 */
  color: #333;  /* 文字颜色 */
  font-size: 16px;  /* 字体大小 */
  font-weight: bold;  /* 粗体 */
  content: attr(data-date);  /* 使用data-date属性作为内容 */
}

.maps-icon {
  background: linear-gradient(145deg, #f8f8f8, #ececec);  /* 白色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

.maps-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  inset: 0;  /* 填满容器 */
  background: 
    linear-gradient(120deg, 
      rgba(76, 217, 100, 0.6) 0%, 
      rgba(156, 204, 101, 0.6) 30%,
      rgba(255, 235, 59, 0.6) 50%,
      rgba(255, 193, 7, 0.6) 70%,
      rgba(255, 87, 34, 0.6) 100%);  /* 彩色渐变背景模拟地图 */
  mask-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6));  /* 蒙版渐变 */
  -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6));  /* Safari支持 */
}

.maps-icon::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 35%;  /* 宽度35% */
  height: 35%;  /* 高度35% */
  top: 32%;  /* 顶部定位 */
  left: 32%;  /* 左侧定位 */
  background: #4285f4;  /* 蓝色背景 */
  border-radius: 50%;  /* 圆形 */
  box-shadow: 
    0 0 0 3px rgba(255, 255, 255, 0.7),  /* 白色环绕 */
    0 0 10px rgba(66, 133, 244, 0.8);  /* 蓝色发光效果 */
}

.messages-icon {
  background: linear-gradient(145deg, #30d158, #2cc156);  /* 绿色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

.messages-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 70%;  /* 宽度70% */
  height: 55%;  /* 高度55% */
  top: 22%;  /* 顶部定位 */
  left: 15%;  /* 左侧定位 */
  background: white;  /* 白色背景 */
  border-radius: 20px;  /* 圆角 */
  box-shadow: 
    inset 0 -3px 6px rgba(0, 0, 0, 0.1),  /* 内阴影 */
    0 2px 4px rgba(0, 0, 0, 0.2);  /* 外阴影 */
}

.messages-icon::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 30%;  /* 宽度30% */
  height: 30%;  /* 高度30% */
  bottom: 18%;  /* 底部定位 */
  left: 20%;  /* 左侧定位 */
  background: white;  /* 白色背景 */
  transform: rotate(45deg);  /* 旋转45度 */
  border-radius: 2px;  /* 轻微圆角 */
  z-index: -1;  /* 层叠顺序 */
}

.mail-icon {
  background: linear-gradient(145deg, #1e88e5, #1976d2);  /* 蓝色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

.mail-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 80%;  /* 宽度80% */
  height: 50%;  /* 高度50% */
  top: 25%;  /* 顶部定位 */
  left: 10%;  /* 左侧定位 */
  background: linear-gradient(to bottom, #fff 0%, #f8f8f8 100%);  /* 白色渐变 */
  border-radius: 4px;  /* 圆角 */
  transform: perspective(120px) rotateX(12deg);  /* 3D旋转效果 */
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.2),  /* 阴影效果 */
    0 0 0 1px rgba(0, 0, 0, 0.05);  /* 边框效果 */
}

.mail-icon::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 80%;  /* 宽度80% */
  height: 20%;  /* 高度20% */
  top: 25%;  /* 顶部定位 */
  left: 10%;  /* 左侧定位 */
  background: linear-gradient(to bottom, #1565c0 0%, #0d47a1 100%);  /* 深蓝色渐变 */
  border-radius: 4px 4px 0 0;  /* 上部圆角 */
  transform: perspective(120px) rotateX(12deg);  /* 3D旋转效果 */
}

.safari-icon {
  background: linear-gradient(145deg, #ffffff, #f6f6f6);  /* 白色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),  /* 内边框 */
    0 2px 5px rgba(0, 0, 0, 0.1);  /* 外阴影 */
}

.safari-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 90%;  /* 宽度90% */
  height: 90%;  /* 高度90% */
  top: 5%;  /* 顶部定位 */
  left: 5%;  /* 左侧定位 */
  background: 
    radial-gradient(circle at center, white 0%, white 35%, transparent 35.1%),  /* 白色中心圆 */
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
    );  /* 彩色环形渐变 */
  border-radius: 50%;  /* 圆形 */
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),  /* 内边框 */
    0 2px 5px rgba(0, 0, 0, 0.1);  /* 外阴影 */
}

.safari-icon::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 44%;  /* 宽度44% */
  height: 44%;  /* 高度44% */
  top: 28%;  /* 顶部定位 */
  left: 28%;  /* 左侧定位 */
  background: 
    radial-gradient(circle at center, #007aff 0%, #007aff 10%, transparent 10.1%),  /* 蓝色中心点 */
    radial-gradient(circle at center, transparent 0%, transparent 40%, #007aff 40.1%, #007aff 70%, transparent 70.1%);  /* 蓝色指南针环 */
  border-radius: 50%;  /* 圆形 */
  transform: rotate(45deg);  /* 旋转45度 */
}

.music-icon {
  background: linear-gradient(145deg, #fc3c44, #ed2c3a);  /* 红色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),  /* 内边框 */
    0 2px 5px rgba(0, 0, 0, 0.1);  /* 外阴影 */
}

.music-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 60%;  /* 宽度60% */
  height: 60%;  /* 高度60% */
  top: 20%;  /* 顶部定位 */
  left: 20%;  /* 左侧定位 */
  background: 
    radial-gradient(circle at 70% 30%, white 0%, white 30%, transparent 30.1%),  /* 白色高光 */
    linear-gradient(to bottom, white, white);  /* 白色背景 */
  border-radius: 0 0 50% 50%;  /* 下半圆形 */
  box-shadow: 
    2px 2px 5px rgba(0, 0, 0, 0.2),  /* 右下阴影 */
    -2px 0 3px rgba(0, 0, 0, 0.1);  /* 左侧阴影 */
}

.music-icon::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 15%;  /* 宽度15% */
  height: 35%;  /* 高度35% */
  top: 20%;  /* 顶部定位 */
  right: 30%;  /* 右侧定位 */
  background: white;  /* 白色背景 */
  border-radius: 2px;  /* 圆角 */
  box-shadow: 
    2px 2px 3px rgba(0, 0, 0, 0.2);  /* 阴影效果 */
}

.appstore-icon {
  background: linear-gradient(145deg, #0571ff, #0b62ed);  /* 蓝色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),  /* 内边框 */
    0 2px 5px rgba(0, 0, 0, 0.1);  /* 外阴影 */
}

.appstore-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 66%;  /* 宽度66% */
  height: 66%;  /* 高度66% */
  top: 17%;  /* 顶部定位 */
  left: 17%;  /* 左侧定位 */
  background: white;  /* 白色背景 */
  -webkit-mask: 
    linear-gradient(45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),  /* 对角线遮罩1 */
    linear-gradient(-45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),  /* 对角线遮罩2 */
    linear-gradient(90deg, black 0%, black 100%);  /* 水平遮罩 */
  mask: 
    linear-gradient(45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),  /* 对角线遮罩1 */
    linear-gradient(-45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),  /* 对角线遮罩2 */
    linear-gradient(90deg, black 0%, black 100%);  /* 水平遮罩 */
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.1);  /* 轻微阴影 */
}

.settings-icon {
  background: linear-gradient(145deg, #ececec, #e0e0e0);  /* 浅灰色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),  /* 内边框 */
    0 2px 5px rgba(0, 0, 0, 0.1);  /* 外阴影 */
}

.settings-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 78%;  /* 宽度78% */
  height: 78%;  /* 高度78% */
  top: 11%;  /* 顶部定位 */
  left: 11%;  /* 左侧定位 */
  background: linear-gradient(145deg, #8e8e93, #7a7a7f);  /* 灰色渐变背景 */
  -webkit-mask: 
    radial-gradient(circle at center, transparent 0%, transparent 25%, black 25.1%, black 37%, transparent 37.1%),  /* 中心圆孔遮罩 */
    repeating-conic-gradient(
      transparent 0deg,
      transparent 30deg,
      black 30.1deg,
      black 60deg
    );  /* 齿轮形状遮罩 */
  mask: 
    radial-gradient(circle at center, transparent 0%, transparent 25%, black 25.1%, black 37%, transparent 37.1%),  /* 中心圆孔遮罩 */
    repeating-conic-gradient(
      transparent 0deg,
      transparent 30deg,
      black 30.1deg,
      black 60deg
    );  /* 齿轮形状遮罩 */
  border-radius: 50%;  /* 圆形 */
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.1),
    0 2px 5px rgba(0, 0, 0, 0.15);  /* 阴影 */
}

.notes-icon {
  background: linear-gradient(145deg, #fffef8, #f8f6e8);  /* 米色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),  /* 内边框 */
    0 2px 5px rgba(0, 0, 0, 0.1);  /* 外阴影 */
}

.notes-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 85%;  /* 宽度85% */
  height: 80%;  /* 高度80% */
  top: 10%;  /* 顶部定位 */
  left: 7.5%;  /* 左侧定位 */
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
    );  /* 线条纹理，模拟纸张 */
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),  /* 内边框 */
    0 1px 3px rgba(0, 0, 0, 0.1);  /* 外阴影 */
}

.notes-icon::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 100%;  /* 宽度100% */
  height: 8%;  /* 高度8% */
  top: 0;  /* 顶部对齐 */
  left: 0;  /* 左侧对齐 */
  background: linear-gradient(to bottom, #f8e283, #f5d151);  /* 黄色渐变背景 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);  /* 轻微阴影 */
}

.health-icon {
  background: linear-gradient(145deg, #ff2d55, #ff3b50);  /* 红色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),  /* 内边框 */
    0 2px 5px rgba(0, 0, 0, 0.1);  /* 外阴影 */
}

.health-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 68%;  /* 宽度68% */
  height: 68%;  /* 高度68% */
  top: 16%;  /* 顶部定位 */
  left: 16%;  /* 左侧定位 */
  background: white;  /* 白色背景 */
  -webkit-mask: linear-gradient(
    to bottom,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );  /* 垂直部分的遮罩 */
  mask: linear-gradient(
    to bottom,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );  /* 垂直部分的遮罩 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);  /* 轻微阴影 */
}

.health-icon::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 68%;  /* 宽度68% */
  height: 68%;  /* 高度68% */
  top: 16%;  /* 顶部定位 */
  left: 16%;  /* 左侧定位 */
  background: white;  /* 白色背景 */
  -webkit-mask: linear-gradient(
    to right,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );  /* 水平部分的遮罩 */
  mask: linear-gradient(
    to right,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );  /* 水平部分的遮罩 */
}

.phone-icon {
  background: linear-gradient(145deg, #35c759, #30b24d);  /* 绿色渐变背景 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),  /* 内边框 */
    0 2px 5px rgba(0, 0, 0, 0.1);  /* 外阴影 */
}

.phone-icon::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  width: 65%;  /* 宽度65% */
  height: 65%;  /* 高度65% */
  top: 17.5%;  /* 顶部定位 */
  left: 17.5%;  /* 左侧定位 */
  background: white;  /* 白色背景 */
  border-radius: 12%;  /* 圆角 */
  -webkit-mask: 
    radial-gradient(circle at center, black 0%, black 75%, transparent 75.1%);
  mask: 
    radial-gradient(circle at center, black 0%, black 75%, transparent 75.1%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 添加信号状态样式 */
.signal {
  width: 18px;  /* 宽度 */
  height: 12px;  /* 高度 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

.signal::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  inset: 0;  /* 填满容器 */
  background: rgba(255, 255, 255, 0.9);  /* 白色背景 */
  border-radius: 2px;  /* 圆角 */
  mask-image: linear-gradient(to right, 
    #000 0%, #000 70%, 
    #000 70%, #000 75%, transparent 75%,
    transparent 80%, #000 80%, #000 85%, transparent 85%);  /* 信号条纹遮罩 */
  -webkit-mask-image: linear-gradient(to right, 
    #000 0%, #000 70%, 
    #000 70%, #000 75%, transparent 75%,
    transparent 80%, #000 80%, #000 85%, transparent 85%);  /* 信号条纹遮罩 */
  animation: signal-pulse 2s ease-in-out infinite;  /* 信号脉冲动画 */
}

@keyframes signal-pulse {
  0%, 100% {
    opacity: 0.9;  /* 初始和结束透明度 */
  }
  50% {
    opacity: 0.7;  /* 中间透明度 */
  }
  }
  
.wifi {
  width: 16px;  /* 宽度 */
  height: 12px;  /* 高度 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

.wifi::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  inset: 0;  /* 填满容器 */
  background: rgba(255, 255, 255, 0.9);  /* 白色背景 */
  border-radius: 2px;  /* 圆角 */
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
  );  /* WiFi图标遮罩 */
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
  );  /* WiFi图标遮罩 */
  transform: scale(1.5);  /* 放大1.5倍 */
}

.battery {
  width: 22px;  /* 宽度 */
  height: 12px;  /* 高度 */
  background: rgba(255, 255, 255, 0.2);  /* 半透明白色背景 */
  border-radius: 3px;  /* 圆角 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

.battery::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  left: 2px;  /* 左侧定位 */
  top: 2px;  /* 顶部定位 */
  bottom: 2px;  /* 底部定位 */
  width: 60%;  /* 宽度60% */
  background: rgba(80, 220, 100, 0.9);  /* 绿色背景 */
  border-radius: 1px;  /* 圆角 */
  box-shadow: 0 0 5px rgba(80, 220, 100, 0.5);  /* 发光效果 */
  animation: battery-pulse 5s ease-in-out infinite;  /* 电池脉冲动画 */
}

@keyframes battery-pulse {
  0%, 100% {
    width: 60%;  /* 初始和结束宽度 */
    background: rgba(80, 220, 100, 0.9);  /* 绿色背景 */
  }
  30% {
    width: 40%;  /* 中间状态宽度 */
    background: rgba(255, 204, 0, 0.9);  /* 黄色背景 */
  }
  60% {
    width: 75%;  /* 中间状态宽度 */
    background: rgba(80, 220, 100, 0.9);  /* 绿色背景 */
  }
}

.battery::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  right: -3px;  /* 右侧定位 */
  top: 3px;  /* 顶部定位 */
  bottom: 3px;  /* 底部定位 */
  width: 2px;  /* 宽度 */
  background: rgba(255, 255, 255, 0.9);  /* 白色背景 */
  border-radius: 0 1px 1px 0;  /* 右侧圆角 */
}

/* 用户指南部分 - 优化设计 */
.user-guide-section {
    width: 100%;  /* 宽度100% */
  max-width: 900px;  /* 最大宽度限制 */
  position: relative;  /* 相对定位 */
  margin-top: 20px;  /* 顶部外边距 */
}

.guide-steps {
  display: flex;  /* 弹性布局 */
  flex-wrap: wrap;  /* 允许换行 */
  justify-content: space-between;  /* 两端对齐 */
  gap: 40px 30px;  /* 行间距40px，列间距30px */
  width: 100%;  /* 宽度100% */
  max-width: 800px;  /* 最大宽度限制 */
  margin: 0 auto;  /* 水平居中 */
  position: relative;  /* 相对定位 */
}

/* 添加连接线 */
.guide-steps::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  top: 25px;  /* 顶部定位 */
  left: 25px;  /* 左侧定位 */
  width: calc(100% - 50px);  /* 宽度计算 */
  height: calc(100% - 50px);  /* 高度计算 */
  border: 2px dashed rgba(66, 185, 131, 0.2);  /* 虚线边框 */
  border-radius: 20px;  /* 圆角 */
  z-index: -1;  /* 层叠顺序，置于底层 */
  pointer-events: none;  /* 不响应鼠标事件 */
}

/* 修改步骤样式，更加现代化 */
.guide-step {
  flex: 0 0 calc(45% - 10px);  /* 弹性基础宽度 */
  padding: 15px 0;  /* 上下内边距 */
  display: flex;  /* 弹性布局 */
  flex-direction: row;  /* 水平排列 */
  align-items: flex-start;  /* 顶部对齐 */
  justify-content: flex-start;  /* 左侧对齐 */
  gap: 25px;  /* 子元素间距 */
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);  /* 平滑过渡 */
  min-height: auto;  /* 最小高度自适应 */
  background: transparent;  /* 透明背景 */
  box-shadow: none;  /* 无阴影 */
  border: none;  /* 无边框 */
  backdrop-filter: none;  /* 无背景滤镜 */
  position: relative;  /* 相对定位 */
}

.step-number {
  width: 60px;  /* 宽度 */
  height: 60px;  /* 高度 */
  border-radius: 50%;  /* 圆形 */
  background: linear-gradient(135deg, #42b983, #2f9768);  /* 绿色渐变背景 */
  color: white;  /* 白色文字 */
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  justify-content: center;  /* 水平居中 */
  font-size: 1.8rem;  /* 字体大小 */
  font-weight: 700;  /* 字体粗细 */
  box-shadow: 0 5px 15px rgba(66, 185, 131, 0.3);  /* 阴影效果 */
  flex-shrink: 0;  /* 不允许缩小 */
  margin-top: 5px;  /* 顶部外边距 */
  position: relative;  /* 相对定位 */
  z-index: 2;  /* 层叠顺序 */
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);  /* 平滑过渡 */
}

.guide-step:hover .step-number {
  transform: scale(1.1) rotate(5deg);  /* 悬停时放大并旋转 */
  box-shadow: 0 8px 25px rgba(66, 185, 131, 0.4);  /* 增强阴影 */
}
  
.step-content {
  flex: 1;  /* 弹性增长 */
  display: flex;  /* 弹性布局 */
  flex-direction: column;  /* 垂直排列 */
  gap: 12px;  /* 子元素间距 */
}

.guide-step:hover {
  transform: translateY(-8px);  /* 悬停时上移 */
}

.step-content h4 {
  font-size: 1.4rem;  /* 字体大小 */
  font-weight: 600;  /* 字体粗细 */
  color: #303133;  /* 字体颜色 */
  margin: 0;  /* 外边距清零 */
  position: relative;  /* 相对定位 */
  padding-bottom: 12px;  /* 底部内边距 */
  transition: color 0.3s ease;  /* 颜色过渡效果 */
}

.guide-step:hover .step-content h4 {
  color: #42b983;  /* 悬停时变绿色 */
}

.step-content h4::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  bottom: 0;  /* 底部对齐 */
  left: 0;  /* 左侧对齐 */
  width: 40px;  /* 宽度 */
  height: 3px;  /* 高度 */
  background: linear-gradient(to right, #42b983, #2f9768);  /* 绿色渐变背景 */
  border-radius: 2px;  /* 圆角 */
  transition: width 0.3s ease;  /* 宽度过渡效果 */
}
  
.guide-step:hover .step-content h4::after {
  width: 80px;  /* 悬停时增加宽度 */
}

.step-content p {
  font-size: 1.1rem;  /* 字体大小 */
  color: #606266;  /* 字体颜色 */
  line-height: 1.7;  /* 行高 */
  margin: 0;  /* 外边距清零 */
}
  
/* 手机百科部分 - 优化设计 */
.phone-encyclopedia {
  width: 100%;  /* 宽度100% */
  max-width: 900px;  /* 最大宽度限制 */
  margin-top: 20px;  /* 顶部外边距 */
}

.encyclopedia-content {
  display: flex;  /* 弹性布局 */
  flex-wrap: wrap;  /* 允许换行 */
  justify-content: space-between;  /* 两端对齐 */
  gap: 40px 30px;  /* 行间距40px，列间距30px */
  width: 100%;  /* 宽度100% */
  max-width: 800px;  /* 最大宽度限制 */
  margin: 0 auto;  /* 水平居中 */
}
  
.encyclopedia-card {
  flex: 0 0 calc(45% - 10px);  /* 弹性基础宽度 */
  padding: 15px 0;  /* 上下内边距 */
  display: flex;  /* 弹性布局 */
  flex-direction: column;  /* 垂直排列 */
  justify-content: flex-start;  /* 顶部对齐 */
  background: transparent;  /* 透明背景 */
  box-shadow: none;  /* 无阴影 */
  border: none;  /* 无边框 */
  backdrop-filter: none;  /* 无背景滤镜 */
  border-left: 0;  /* 无左边框 */
  padding-left: 0;  /* 无左内边距 */
  min-height: auto;  /* 最小高度自适应 */
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);  /* 平滑过渡 */
  position: relative;  /* 相对定位 */
  overflow: visible;  /* 允许内容溢出 */
}

.encyclopedia-card::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  top: 0;  /* 顶部对齐 */
  left: 0;  /* 左侧对齐 */
  height: 100%;  /* 高度100% */
  width: 3px;  /* 宽度 */
  background: linear-gradient(to bottom, #42b983, transparent);  /* 渐变背景 */
  border-radius: 3px;  /* 圆角 */
  transition: all 0.3s ease;  /* 平滑过渡 */
  opacity: 0.3;  /* 透明度 */
}

.encyclopedia-card:hover::before {
  width: 6px;  /* 悬停时增加宽度 */
  opacity: 1;  /* 悬停时完全不透明 */
}

.encyclopedia-icon {
  font-size: 2.5rem;  /* 字体大小 */
  margin-bottom: 15px;  /* 底部外边距 */
  background: linear-gradient(135deg, #42b983, #2f9768);  /* 绿色渐变背景 */
  -webkit-background-clip: text;  /* 背景剪裁为文字 */
  -webkit-text-fill-color: transparent;  /* 文字填充透明 */
  background-clip: text;  /* 标准属性 */
  display: inline-block;  /* 行内块显示 */
  filter: drop-shadow(0 2px 4px rgba(66, 185, 131, 0.2));  /* 阴影效果 */
  transition: all 0.3s ease;  /* 平滑过渡 */
  transform-origin: center;  /* 变换原点居中 */
}

.encyclopedia-card:hover .encyclopedia-icon {
  transform: scale(1.1);  /* 悬停时放大 */
  filter: drop-shadow(0 4px 8px rgba(66, 185, 131, 0.4));  /* 增强阴影 */
}

.encyclopedia-card h4 {
  font-size: 1.4rem;  /* 字体大小 */
  font-weight: 600;  /* 字体粗细 */
  color: #303133;  /* 字体颜色 */
  margin: 0 0 20px 0;  /* 外边距 */
  padding-bottom: 10px;  /* 底部内边距 */
  position: relative;  /* 相对定位 */
  transition: color 0.3s ease;  /* 颜色过渡效果 */
}

.encyclopedia-card:hover h4 {
  color: #42b983;  /* 悬停时变绿色 */
}

.encyclopedia-card h4::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  bottom: 0;  /* 底部对齐 */
  left: 0;  /* 左侧对齐 */
  width: 40px;  /* 宽度 */
  height: 2px;  /* 高度 */
  background: linear-gradient(to right, #42b983, #2f9768);  /* 绿色渐变背景 */
  transition: width 0.3s ease;  /* 宽度过渡效果 */
}

.encyclopedia-card:hover h4::after {
  width: 80px;  /* 悬停时增加宽度 */
}
  
.encyclopedia-list {
  list-style: none;  /* 无列表样式 */
  padding-left: 5px;  /* 左侧内边距 */
  margin: 0;  /* 外边距清零 */
}

.encyclopedia-list li {
  position: relative;  /* 相对定位 */
  padding-left: 28px;  /* 左侧内边距 */
  margin-bottom: 14px;  /* 底部外边距 */
  font-size: 1.1rem;  /* 字体大小 */
  color: #606266;  /* 字体颜色 */
  transition: transform 0.3s ease;  /* 变换过渡效果 */
}

.encyclopedia-list li::before {
  content: '•';  /* 伪元素内容，项目符号 */
  position: absolute;  /* 绝对定位 */
  left: 0;  /* 左侧对齐 */
  color: #42b983;  /* 绿色 */
  font-size: 1.8rem;  /* 字体大小 */
  line-height: 1;  /* 行高 */
  transition: transform 0.3s ease;  /* 变换过渡效果 */
}
  
.encyclopedia-list li:hover {
  transform: translateX(5px);  /* 悬停时右移 */
  color: #303133;  /* 悬停时颜色加深 */
}

.encyclopedia-list li:hover::before {
  transform: scale(1.2);  /* 悬停时放大项目符号 */
}

.encyclopedia-card:hover {
  transform: translateY(-8px);  /* 悬停时上移 */
}

/* 评测专区 - 优化设计，去除卡片框架，与其他模块风格一致 */
.review-section {
  width: 100%;  /* 宽度100% */
  max-width: 900px;  /* 最大宽度限制 */
  margin-top: 20px;  /* 顶部外边距 */
  display: flex;  /* 弹性布局 */
  flex-direction: column;  /* 垂直排列 */
  align-items: center;  /* 水平居中 */
}

.review-cards {
  display: flex;  /* 弹性布局 */
  flex-wrap: wrap;  /* 允许换行 */
  justify-content: space-between;  /* 两端对齐 */
  gap: 40px 30px;  /* 行间距40px，列间距30px */
  width: 100%;  /* 宽度100% */
  max-width: 800px;  /* 最大宽度限制 */
  margin: 0 auto;  /* 水平居中 */
}

.review-card {
  flex: 0 0 calc(45% - 10px);  /* 弹性基础宽度 */
  padding: 15px 0;  /* 上下内边距 */
  display: flex;  /* 弹性布局 */
  flex-direction: column;  /* 垂直排列 */
  justify-content: flex-start;  /* 顶部对齐 */
  position: relative;  /* 相对定位 */
  background: transparent;  /* 透明背景 */
  box-shadow: none;  /* 无阴影 */
  border: none;  /* 无边框 */
  backdrop-filter: none;  /* 无背景滤镜 */
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);  /* 平滑过渡 */
  min-height: auto;  /* 最小高度自适应 */
  overflow: visible;  /* 允许内容溢出 */
}

.review-card::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  top: 0;  /* 顶部对齐 */
  left: 0;  /* 左侧对齐 */
  height: 100%;  /* 高度100% */
  width: 3px;  /* 宽度 */
  background: linear-gradient(to bottom, #42b983, transparent);  /* 渐变背景 */
  border-radius: 3px;  /* 圆角 */
  transition: all 0.3s ease;  /* 平滑过渡 */
  opacity: 0.3;  /* 透明度 */
}

.review-card:hover::before {
  width: 6px;  /* 悬停时增加宽度 */
  opacity: 1;  /* 悬停时完全不透明 */
}

.review-header {
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  gap: 18px;  /* 子元素间距 */
  margin-bottom: 20px;  /* 底部外边距 */
}

.review-avatar {
  width: 65px;  /* 宽度 */
  height: 65px;  /* 高度 */
  border-radius: 50%;  /* 圆形 */
  background: linear-gradient(135deg, #42b983, #2f9768);  /* 绿色渐变背景 */
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  justify-content: center;  /* 水平居中 */
  font-size: 1.5rem;  /* 字体大小 */
  font-weight: 600;  /* 字体粗细 */
  color: white;  /* 白色文字 */
  box-shadow: 0 4px 10px rgba(66, 185, 131, 0.3);  /* 阴影效果 */
  transition: all 0.3s ease;  /* 平滑过渡 */
}

.review-card:hover .review-avatar {
  transform: scale(1.1) rotate(5deg);  /* 悬停时放大并旋转 */
  box-shadow: 0 8px 20px rgba(66, 185, 131, 0.4);  /* 增强阴影 */
}

.review-info {
  display: flex;  /* 弹性布局 */
  flex-direction: column;  /* 垂直排列 */
  gap: 8px;  /* 子元素间距 */
}

.review-name {
  font-size: 1.2rem;  /* 字体大小 */
  font-weight: 600;  /* 字体粗细 */
  color: #333;  /* 字体颜色 */
}

.review-stars {
  font-size: 1rem;  /* 字体大小 */
  color: #ffd700;  /* 金色 */
  text-shadow: 0 0 2px rgba(255, 215, 0, 0.5);  /* 文字阴影 */
  display: flex;  /* 弹性布局 */
  gap: 2px;  /* 子元素间距 */
}
  
.review-content {
  margin-left: 83px;  /* 左侧外边距 */
  position: relative;  /* 相对定位 */
  margin-bottom: 15px;  /* 底部外边距 */
}

.review-content p {
  font-size: 1.1rem;  /* 字体大小 */
  color: #606266;  /* 字体颜色 */
  line-height: 1.7;  /* 行高 */
  margin: 0;  /* 外边距清零 */
  font-style: italic;  /* 斜体 */
  position: relative;  /* 相对定位 */
}
  
.review-content p::before {
  content: '"';  /* 伪元素内容，引号 */
  position: absolute;  /* 绝对定位 */
  left: -25px;  /* 左侧定位 */
  top: -5px;  /* 顶部定位 */
  font-size: 2.5rem;  /* 字体大小 */
  color: rgba(66, 185, 131, 0.2);  /* 浅绿色 */
  font-family: Georgia, serif;  /* 字体 */
}

.review-phone-tag {
  display: inline-block;  /* 行内块显示 */
  padding: 6px 15px;  /* 内边距 */
  background: rgba(66, 185, 131, 0.1);  /* 浅绿色背景 */
  border: 1px solid rgba(66, 185, 131, 0.3);  /* 绿色边框 */
  border-radius: 20px;  /* 圆角 */
  color: #42b983;  /* 绿色文字 */
  font-weight: 500;  /* 字体粗细 */
  margin-top: 15px;  /* 顶部外边距 */
  font-size: 1rem;  /* 字体大小 */
  margin-left: 83px;  /* 左侧外边距 */
  transition: all 0.3s ease;  /* 平滑过渡 */
}

.review-card:hover .review-phone-tag {
  background: rgba(66, 185, 131, 0.2);  /* 悬停时加深背景色 */
  border-color: rgba(66, 185, 131, 0.5);  /* 悬停时加深边框色 */
}

.review-card:hover {
  transform: translateY(-8px);  /* 悬停时上移 */
}

/* 修改标题样式，使三个部分风格一致 */
.section-title {
  font-size: 1.6rem;  /* 字体大小 */
  color: #303133;  /* 字体颜色 */
  margin-bottom: 30px;  /* 底部外边距 */
  position: relative;  /* 相对定位 */
  padding-left: 18px;  /* 左侧内边距 */
  display: inline-block;  /* 行内块显示 */
}

.section-title::before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  left: 0;  /* 左侧对齐 */
  top: 50%;  /* 垂直居中 */
  transform: translateY(-50%);  /* 精确垂直居中 */
  width: 6px;  /* 宽度 */
  height: 30px;  /* 高度 */
  background: linear-gradient(to bottom, #42b983, #2f9768);  /* 绿色渐变背景 */
  border-radius: 3px;  /* 圆角 */
}
  
.section-title::after {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  bottom: -8px;  /* 底部定位 */
  left: 18px;  /* 左侧定位 */
  width: 60px;  /* 宽度 */
  height: 2px;  /* 高度 */
  background: linear-gradient(to right, #42b983, transparent);  /* 绿色渐变背景 */
}

/* 响应式调整 */
@media (max-width: 768px) {
  .guide-step, 
  .encyclopedia-card,
  .review-card {
    flex: 0 0 100%;  /* 在小屏幕上占满宽度 */
  }
  
  .guide-steps,
  .encyclopedia-content,
  .review-cards {
    gap: 30px;  /* 减少间距 */
  }
  
  .guide-steps::before {
    display: none;  /* 隐藏连接线 */
  }
  
  .section-title {
    font-size: 1.4rem;  /* 减小字体大小 */
  }
  
  .step-number,
  .review-avatar {
    width: 50px;  /* 减小宽度 */
    height: 50px;  /* 减小高度 */
    font-size: 1.4rem;  /* 减小字体大小 */
  }
  
  .step-content h4,
  .encyclopedia-card h4 {
    font-size: 1.3rem;  /* 减小字体大小 */
  }
  
  .step-content p,
  .encyclopedia-list li,
  .review-content p {
    font-size: 1rem;  /* 减小字体大小 */
  }
  
  .encyclopedia-icon {
    font-size: 2.2rem;  /* 减小字体大小 */
  }
  
  .review-content,
  .review-phone-tag {
    margin-left: 0;  /* 移除左侧外边距 */
  }
  
  .review-content p::before {
    left: -20px;  /* 调整左侧定位 */
    top: -10px;  /* 调整顶部定位 */
  }
}

/* 专业评测卡片样式 */
.featured-review {
  flex: 0 0 100%;  /* 占满宽度 */
  margin-top: 20px;  /* 顶部外边距 */
  padding: 20px 25px;  /* 内边距 */
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.9));  /* 白色渐变背景 */
  border-radius: 16px;  /* 圆角 */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);  /* 阴影效果 */
  position: relative;  /* 相对定位 */
  overflow: hidden;  /* 隐藏溢出内容 */
  border-left: 5px solid #42b983;  /* 左侧绿色边框 */
}

.featured-review:before {
  content: '';  /* 伪元素内容 */
  position: absolute;  /* 绝对定位 */
  top: 0;  /* 顶部对齐 */
  left: 0;  /* 左侧对齐 */
  width: 100%;  /* 宽度100% */
  height: 100%;  /* 高度100% */
  background: radial-gradient(circle at top right, rgba(66, 185, 131, 0.1), transparent 70%);  /* 径向渐变背景 */
  z-index: 0;  /* 层叠顺序 */
}

.featured-badge {
  position: absolute;  /* 绝对定位 */
  top: 0;  /* 顶部对齐 */
  right: 0;  /* 右侧对齐 */
  background: linear-gradient(135deg, #42b983, #2f9768);  /* 绿色渐变背景 */
  color: white;  /* 白色文字 */
  font-weight: 600;  /* 字体粗细 */
  padding: 8px 15px;  /* 内边距 */
  font-size: 0.9rem;  /* 字体大小 */
  border-radius: 0 0 0 12px;  /* 左下圆角 */
  box-shadow: -3px 3px 10px rgba(66, 185, 131, 0.2);  /* 阴影效果 */
  z-index: 1;  /* 层叠顺序 */
}

.featured-review .review-avatar {
  background: linear-gradient(135deg, #5d7df5, #4562d1);  /* 蓝色渐变背景 */
}

.featured-review .review-avatar:after {
  content: '✓';  /* 伪元素内容，对勾 */
  position: absolute;  /* 绝对定位 */
  bottom: -2px;  /* 底部定位 */
  right: -2px;  /* 右侧定位 */
  width: 20px;  /* 宽度 */
  height: 20px;  /* 高度 */
  background: #fff;  /* 白色背景 */
  border-radius: 50%;  /* 圆形 */
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  justify-content: center;  /* 水平居中 */
  font-size: 12px;  /* 字体大小 */
  color: #4562d1;  /* 蓝色文字 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);  /* 阴影效果 */
  font-weight: bold;  /* 字体粗细 */
}

.featured-review .review-content {
  z-index: 1;  /* 层叠顺序 */
}

.review-metrics {
  margin: 15px 0 15px 83px;  /* 外边距 */
  display: flex;  /* 弹性布局 */
  flex-direction: column;  /* 垂直排列 */
  gap: 12px;  /* 子元素间距 */
  width: 70%;  /* 宽度70% */
}

.metric {
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  gap: 12px;  /* 子元素间距 */
}

.metric-label {
  width: 60px;  /* 宽度 */
  font-weight: 500;  /* 字体粗细 */
  font-size: 0.9rem;  /* 字体大小 */
  color: #606266;  /* 字体颜色 */
}

.metric-bar {
  flex: 1;  /* 弹性增长 */
  height: 8px;  /* 高度 */
  background: #e4e7ed;  /* 背景色 */
  border-radius: 4px;  /* 圆角 */
  overflow: hidden;  /* 隐藏溢出内容 */
}

.metric-fill {
  height: 100%;  /* 高度100% */
  background: linear-gradient(to right, #42b983, #2f9768);  /* 绿色渐变背景 */
  border-radius: 4px;  /* 圆角 */
}

.metric-value {
  font-weight: 600;  /* 字体粗细 */
  color: #42b983;  /* 绿色文字 */
  width: 40px;  /* 宽度 */
  text-align: right;  /* 右对齐 */
}

/* 添加手机百科和评测专区新样式 */
.read-more {
  display: flex;  /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  gap: 8px;  /* 子元素间距 */
  margin-top: 15px;  /* 顶部外边距 */
  color: #42b983;  /* 绿色文字 */
  font-weight: 500;  /* 字体粗细 */
  cursor: pointer;  /* 鼠标指针样式 */
  transition: all 0.3s ease;  /* 平滑过渡 */
}

.read-more:hover {
  transform: translateX(5px);  /* 悬停时右移 */
}

.read-more .el-icon {
  font-size: 0.9rem;  /* 字体大小 */
  transition: transform 0.3s ease;  /* 变换过渡效果 */
}

.read-more:hover .el-icon {
  transform: translateX(3px);  /* 悬停时右移 */
}

.review-badge {
  display: inline-block;  /* 行内块显示 */
  padding: 4px 10px;  /* 内边距 */
  background: rgba(66, 185, 131, 0.1);  /* 浅绿色背景 */
  border-radius: 12px;  /* 圆角 */
  color: #42b983;  /* 绿色文字 */
  font-size: 0.8rem;  /* 字体大小 */
  font-weight: 500;  /* 字体粗细 */
  margin-left: auto;  /* 左侧外边距自动 */
}

.pro-badge {
  background: rgba(77, 114, 254, 0.1);  /* 浅蓝色背景 */
  color: #4d72fe;  /* 蓝色文字 */
}

.professional-review {
  flex: 0 0 100%;  /* 占满宽度 */
  border-top: 1px dashed rgba(66, 185, 131, 0.3);  /* 顶部虚线边框 */
  padding-top: 25px;  /* 顶部内边距 */
  margin-top: 10px;  /* 顶部外边距 */
}

.professional-review::before {
  background: linear-gradient(to bottom, #4d72fe, transparent);  /* 蓝色渐变背景 */
}

.review-action {
  margin: 15px 0 10px 83px;  /* 外边距 */
}

.mini-btn {
  padding: 8px 16px;  /* 内边距 */
  display: inline-flex;  /* 行内弹性布局 */
  align-items: center;  /* 垂直居中 */
  gap: 8px;  /* 子元素间距 */
  font-size: 0.9rem;  /* 字体大小 */
  border-radius: 20px;  /* 圆角 */
  background: linear-gradient(135deg, #42b983, #2f9768);  /* 绿色渐变背景 */
  color: white;  /* 白色文字 */
  border: none;  /* 无边框 */
  cursor: pointer;  /* 鼠标指针样式 */
  transition: all 0.3s ease;  /* 平滑过渡 */
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.2);  /* 阴影效果 */
}

.mini-btn:hover {
  transform: translateY(-3px);  /* 悬停时上移 */
  box-shadow: 0 6px 15px rgba(66, 185, 131, 0.3);  /* 增强阴影 */
}

.mini-btn .el-icon {
  font-size: 0.9rem;  /* 字体大小 */
  transition: transform 0.3s ease;  /* 变换过渡效果 */
}

.mini-btn:hover .el-icon {
  transform: translateX(3px);  /* 悬停时右移 */
}

@media (max-width: 768px) {
  .review-metrics,
  .review-action {
    margin-left: 0;  /* 移除左侧外边距 */
  }
  
  .review-badge {
    font-size: 0.7rem;  /* 减小字体大小 */
    padding: 3px 8px;  /* 减小内边距 */
  }
}
</style>